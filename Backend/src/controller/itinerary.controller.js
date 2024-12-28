import { Itinerary } from "../model/itinerary.model.js";
import { User } from "../model/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const updateItinerary = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id)
    if (!user) {
        throw new apiError(404, 'User is not found')
    }

    const { destination, activities, budget, startDate, endDate, description } = req.body

    const itinerary = new Itinerary({
        user: user._id,
        destination,
        activities,
        budget,
        startDate,
        endDate,
        description,
    })

    await itinerary.save()

    return res
        .status(200)
        .json(
            200,
            new apiResponse(200, itinerary, 'Itinarary updated successfully')
        )
})

const searchLocation = asyncHandler(async (req, res) => {

    const { location } = req.body

    const itinerary = await Itinerary.find({
        destination: location
    })

    return res
    .status(200)
    .json(200, itinerary, 'location is searched successfully')
})

export {
    updateItinerary,
    searchLocation,
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