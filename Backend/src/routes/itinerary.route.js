import { Router } from "express";
import { updateItinerary } from "../controller/itinerary.controller.js";
import { searchLocation } from "../controller/itinerary.controller.js";

const router = Router()

router.route('/updateItinerary').post(updateItinerary)
router.route('/searchLocation').post(searchLocation)

export default router
