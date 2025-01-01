import getRecommendation from "../db/openai.config.js";
import { Itinerary } from "../model/itinerary.model.js";
import { User } from "../model/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fetchItineraryFromChatGPT from "../db/openai.config.js";
import { isValidObjectId } from "mongoose";

const updateItinerary = asyncHandler(async (req, res) => {
    const {  prompt } = req.body;
    if(!isValidObjectId(req.user?._id)) {
        throw new apiError(400, 'Invalid user id');
    }

    const user = await User.findById(req.user?._id)
    if (!user) {
        throw new apiError(404, 'User is not found')
    }

     const itineraryData = await fetchItineraryFromChatGPT(prompt);
     if (!prompt) {
        throw new apiError(400, 'Prompt is required');
    }

    const newItinerary = new Itinerary({
            user: req.user._id,
            destination: itineraryData.destination,
            activities: itineraryData.activities,
            budget: itineraryData.budget,
            startDate: new Date(itineraryData.startDate),
            endDate: new Date(itineraryData.endDate),
            description: itineraryData.description,
    });

    await newItinerary.save()

    return res
        .status(200)
        .json(
            new apiResponse(200, newItinerary, 'Itinarary updated successfully')
        )
})

const getUserItineraries = asyncHandler(async (req, res) => {
    if(!isValidObjectId(req.user?._id)) {
        throw new apiError(400, 'Invalid user id');
    }

    const user = await User.findById(req.user?._id)
    if (!user) {
        throw new apiError(404, 'User not found');
    }
    const itineraries = await Itinerary.find({ user: req.user._id });

    if(itineraries?.length === 0) {
        throw new apiError(404, 'No itinerary found');
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, itineraries, 'Itineraries fetched successfully')
        )
})

const getItinerary = asyncHandler(async (req, res) => {
    const {initenaryId} = req.params;
    const itinerary = await Itinerary.findById(initenaryId).populate('user');
    if (!itinerary) {
        throw new apiError(404, 'Itinerary not found');
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, itinerary, 'Itinerary fetched successfully')
        )
})

const deleteItinerary = asyncHandler(async (req, res) => {
    const {initenaryId} = req.params;
    if(!isValidObjectId(initenaryId)) {
        throw new apiError(400, 'Invalid itinerary id');
    }
    const itinerary = await Itinerary.findById(initenaryId);

    if(!itinerary) {
        throw new apiError(404, 'Itinerary not found');
    }

    if(itinerary?.user?.toString() !== req.user?._id?.toString()) {
        throw new apiError(403, 'You are not authorized to delete this itinerary');
    }
    
    await Itinerary.findByIdAndDelete(initenaryId);

    return res
        .status(200)
        .json(
            new apiResponse(200, itinerary, 'Itinerary deleted successfully')
        )
})
const searchLocation = asyncHandler(async (req, res) => {

    const { location } = req.body

    const itinerary = await Itinerary.find({
        destination: location
    })

    if (!itinerary) {
        throw new apiError(404, 'This Place is not found')
    }

    return res
    .status(200)
    .json(new apiResponse(200, itinerary, 'location is searched successfully'))
})

const getResultFromChatGPT = asyncHandler(async ({ prompts }) => {
    try {
        const response = await getRecommendation(prompts)
        return response
    } catch (error) {
        console.log('An error while finding result from AI', error);
        throw error
    }
})

export {
    updateItinerary,
    searchLocation,
    getUserItineraries,
    getResultFromChatGPT,
    deleteItinerary,
    getItinerary
}

/**
 * initialize budget according to user
 * create a new itinerary
 * save the itinerary
 * 
 */

/**
 * Logic behind the trip planner
 * 
 * first decide place.
 * decide which activities or adventure user wants to do
 * make assure if user is solo or with a group
 * from where to go and by which platform they wants to go
 * make a final budget of trip and travels 
 * }
 */


/**
 * SOME QUESTIONS RELATED TO MAKE A TRIP PLANE
 * 
 * where we are going?
 * how's the weather of there?
 * How we reach there? (like: Train, Bus, Road, air, water etc)
 * which places are there to explore?
 * How we stay there? (hotels, guest house)
 * where we can eat good food in cheaper?
 * travel dates and durations
 * which type of clothes, and other neccessory things, 
 * what is our budget?
 * how long is our trip?
 * 
 */

/**     WHAT THIS APP DO?
 * user ke budget ke according ek trip planning tree bnake dega ki kha-kha ja skte h, and vha jane ka kitna kharcha ayega per person and kya kya activities or adventure kr skte h
 * acha khana-pina and rahna ensure krega according to budget
 * weather check update ki is weather me kya kya adventure and activities ho skti h and kha ka view kesa rhega, ghoomne layak h ya nhi
 * isme ek or option hoga jisme neccessory things ki list hogi with check box, jo packing time pe user ki help krega
 * total budget updation and per person ka kya hisab h uske according ek expence tracker
 * agar trip pe couples h to unke according plan bnayega
 */