import {Router} from "express"
import { getRooms,createRooms } from "../controllers/roomController"
import { ROOMS_URL } from "../routesURL/URL"

const roomsRouter = Router()

// get available rooms in hotels
roomsRouter.get(ROOMS_URL.getAll,getRooms)
// create rooms in hotels
roomsRouter.post(ROOMS_URL.create,createRooms)

export default roomsRouter