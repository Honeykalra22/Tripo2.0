import express from "express";
import { Itinerary } from "./models/itineraryModel.js"; 
import fetchItineraryFromChatGPT from "../db/openai.config.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(upload.none());
router.use(verifyJwt);

router.post("/autofill-itinerary", async (req, res) => {
    const {  prompt } = req.body;
    const userId = req.user?._id;
    if (!userId || !prompt) {
        return res.status(400).json({ message: "userId and prompt are required." });
    }

    try {
        const itineraryData = await fetchItineraryFromChatGPT(prompt);

        const newItinerary = new Itinerary({
            user: userId,
            destination: itineraryData.destination,
            activities: itineraryData.activities,
            budget: itineraryData.budget,
            startDate: new Date(itineraryData.startDate),
            endDate: new Date(itineraryData.endDate),
            description: itineraryData.description,
        });

        const savedItinerary = await newItinerary.save();

        return res.status(201).json({
            message: "Itinerary created successfully.",
            itinerary: savedItinerary,
        });
    } catch (error) {
        console.error("Error creating itinerary:", error);
        return res.status(500).json({ message: "Failed to create itinerary.", error });
    }
});

export default router;
