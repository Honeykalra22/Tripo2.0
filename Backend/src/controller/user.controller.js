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
            "something went wrong while generating referesh and access token"
        )
    }
})

const registerUser = asyncHandler(async (req, res) => {

    const { username, fullname, email, password } = req.body;

    if ([username, fullname, email].some((field) => field?.trim() === '')) {
        throw new apiError(400, 'All fields are required')
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new apiError(400, 'User is already registered')
    }

    const user = await User.create({
        fullname,
        username,
        email,
        password,
        age,
        mobile_no,
    })

    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
    )

    if (!createdUser) {
        throw new apiError(400, 'Something went wrong')
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, createdUser, 'User is registered successfully')
        )
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email) {
        throw new apiError(400, 'Username or Email is missing')
    }

    const user = await User.findOne({
        $or: [{ username, email }]
    })

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
            $set: {
                accessToken: '',
                refreshToken: '',
            },
        },
        {
            new: true,
        },
    )
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
        new apiResponse(200, 'User is logout successfully')
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
    await user.save()

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
        200, 
        new apiResponse(200, user, 'Avatar is updated successfully')
    )
})



export {
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    updatePassword,
    updateAvatar
}