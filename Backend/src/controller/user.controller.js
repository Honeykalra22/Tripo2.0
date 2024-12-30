import { User } from "../model/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const generateAccessTokenAndRefreshToken = asyncHandler(async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new apiError(
            401,
            "something went wrong while generating refresh and access tokens"
        )
    }
})

const registerUser = asyncHandler(async (req, res) => {

    const { username, fullname, email, password, mobile_no } = req.body;
    console.log(username, fullname, email, password, mobile_no);

    if ([username, fullname, email].some((field) => field?.trim() === '')) {
        throw new apiError(400, 'All fields are required')
    }
    
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
      throw new apiError(400, "Invalid email address");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new apiError(409, 'User is already registered')
    }

    const user = await User.create({
        fullname,
        username,
        email,
        password,
        mobile_no
    })

    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
    )

    if (!createdUser) {
        throw new apiError(500, 'Something went wrong while registering the user')
    }
    console.log(createdUser);
    return res
        .status(201)
        .json(
            new apiResponse(200, createdUser, 'User is registered successfully')
        )
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body
    console.log("Username: : : : : ", username, password);
    if (!username && !email) {
        throw new apiError(400, 'Username or Email is missing')
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    console.log(user)
    if (!user) {
        throw new apiError(404, 'User is not registered')
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new apiError(401, 'Password is not corrected')
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    const loginUser = await User.findById(user._id).select(
        '-password -refreshToken'
    )

    const options = {
        httpOnly: true,
        secure: false,
    }

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: loginUser,
                    accessToken,
                    refreshToken,
                },
                'User is login successfully'
            )
        )
})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        },
    )
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    }

    return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(
        new apiResponse(200, {} , 'User logged out successfully')
    )
})

const updateUserProfile = asyncHandler(async(req, res) => {
    const { fullname, email, age, mobile_no } = req.body

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                fullname : fullname,
                email : email,
                age: age,
                mobile_no: mobile_no,
            },
        },
        {
            new: true,
        }
    ).select('-password -refreshToken')

    if (!user) {
        throw new apiError(400, 'Something went wrong')
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, user, 'User profile is updated successfully')
    )
})

const updatePassword = asyncHandler(async(req, res) => {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
        throw new apiError(400, 'Current password and new password are required')
    }

    const user = await User.findById(req.user._id)

    const isPasswordValid = await user.isPasswordCorrect(currentPassword)
    if (!isPasswordValid) {
        throw new apiError(401, 'Current password is not correct')
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
    .status(200)
    .json(
        new apiResponse(200, 'Password is updated successfully')
    )
})

const updateAvatar = asyncHandler(async(req, res) => {
    
    const avatarLocalPath = req.file?.path;
    if(!avatarLocalPath) {
        throw new apiError(404, 'Avatar is not found')
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar.url) {
        throw new apiError(401, 'avatar is not uploaded on cloudinary')
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id, 
        {
            $set: {
                avatar: avatar.url,
            },
        },
        {
            new: true,
        }
    ).select('-password -refreshToken')

    return res
    .status(200)
    .json(
        new apiResponse(200, user, 'Avatar is updated successfully')
    )
})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
        .status(200)
        .json(
            new apiResponse(200, req.user, 'Current user is fetched successfully')
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const receivedRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
    if (!receivedRefreshToken) {
      throw new apiError(401, "Unauthorized request");
    }
    try {
      const decodedToken = jwt.verify(
        receivedRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
  
      const user = await User.findById(decodedToken?._id);
      if (!user) {
        throw new apiError(401, "Invalid Refresh Token");
      }
      if (user?.refreshToken !== receivedRefreshToken) {
        throw new apiError(401, "Refresh Token is Expired");
      }
      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
      };
      const { accessToken, newRefreshToken } =
        await generateAccessTokenAndRefreshToken(user._id);
  
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
          new apiResponse(
            200,
            { accessToken, refreshToken: newRefreshToken },
            "AccessToken Refreshed successfully"
          )
        );
    } catch (error) {
      throw new apiError(401, error?.message || "Unauthorized request");
    }
  });
  


export {
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    updatePassword,
    updateAvatar,
    getCurrentUser,
    refreshAccessToken
}