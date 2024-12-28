import { Router } from "express";
import { updateItinerary } from "../controller/itinerary.controller.js";
import { searchLocation } from "../controller/itinerary.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/updateItinerary').post(verifyJwt, updateItinerary)
router.route('/searchLocation').post(verifyJwt, searchLocation)

export default router
