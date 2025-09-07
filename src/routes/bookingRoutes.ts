import {Router} from "express";
import { booking,getBookingDetails } from "../controllers/bookingController";
import { BOOKING_URL } from "../routesURL/URL";

const bookingRouter = Router()
// booking rooms
bookingRouter.post(BOOKING_URL.booking,booking)
// get booking details
bookingRouter.get(BOOKING_URL.get_booking_details,getBookingDetails)

export default bookingRouter;