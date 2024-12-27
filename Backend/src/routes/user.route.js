import { Router } from "express";
import { loginUser, logoutUser, registerUser, updatePassword, updateUserProfile } from "../controller/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJwt, logoutUser)
router.route('/updateprofile').patch(verifyJwt, updateUserProfile)
router.route('/updatePassword').patch(verifyJwt, updatePassword)
router.route('/updateAvatar').post(
    verifyJwt,
    upload.fields([
        {
            name: 'Avatar',
            maxCount: 1,
        },
    ])
)

export default router