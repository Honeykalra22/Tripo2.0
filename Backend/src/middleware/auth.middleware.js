import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { User } from '../model/user.model.js';


export const verifyJwt = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', "")
        if(!token) {
            throw new apiError("UnAuthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select('-password -refreshToken')

        if(!user) {
            throw new apiError(401, 'Invalid access token')
        }

        req.user = user
        next()
    } catch (error) {
        throw new apiError(401, error?.message || "invalid access token")
    }
})