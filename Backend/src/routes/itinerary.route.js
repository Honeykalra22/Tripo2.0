import { Router } from "express";
import { updateItinerary, searchLocation, getResultFromChatGPT } from "../controller/itinerary.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.use(upload.none());
router.use(verifyJwt);

router.route('/updateItinerary').post(verifyJwt, updateItinerary)
router.route('/searchLocation').post(verifyJwt, searchLocation)
router.route('/getResultFromChatGPT').get( getResultFromChatGPT)

export default router
