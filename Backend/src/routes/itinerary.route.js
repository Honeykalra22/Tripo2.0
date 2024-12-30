import { Router } from "express";
import { updateItinerary, searchLocation, getResultFromChatGPT } from "../controller/itinerary.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/updateItinerary').post(verifyJwt, updateItinerary)
router.route('/searchLocation').post(verifyJwt, searchLocation)
router.route('/getResultFromChatGPT').get( getResultFromChatGPT)

export default router
