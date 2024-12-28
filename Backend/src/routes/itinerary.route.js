import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(upload.none());
router.use(verifyJwt);

router.post("/autofill-itinerary" )

export default router;
