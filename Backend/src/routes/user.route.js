import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser, updatePassword, updateUserProfile } from "../controller/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.route('/register').post(upload.none(),registerUser)
router.route('/login').post(upload.none(),loginUser)
router.route('/logout').post(upload.none(),verifyJwt, logoutUser)
router.route('/updateprofile').patch(upload.none(), verifyJwt, updateUserProfile)
router.route('/updatePassword').patch(upload.none(), verifyJwt, updatePassword)
router.route('/getCurrentUser').get(upload.none(), verifyJwt, getCurrentUser)
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