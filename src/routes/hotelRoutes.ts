import { getAllHotels,createHotel } from "../controllers/hotelController";
import { HOTELS_URL } from "../routesURL/URL";
import {Router} from "express"

const hotelRouters = Router()

// get all hotels
hotelRouters.get(HOTELS_URL.getAll,getAllHotels)
// create new hotels 
hotelRouters.post(HOTELS_URL.create,createHotel)

export default hotelRouters