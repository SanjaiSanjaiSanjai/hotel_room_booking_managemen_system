import {Request, Response} from "express"
import { customerRepository,bookingRepository } from "../repository/repository";
import { successResponse,sendErrorResponse } from "../handleResponse/response";
import { Bookings } from "../entity/Bookings";
import { MESSAGES } from "../constants/messages";
import { Booking_Status } from "../enums/bookingEnums";
import { Customers } from "../entity/Customers";

export async function booking(req: Request,res: Response) {
    const {check_in_date,check_out_date,status,num_of_guests,customers} = req.body;

    const is_customer: Customers | null  = await customerRepository.findOne({where:{id:customers}})
    if (!is_customer) {
        return sendErrorResponse(res,MESSAGES.NO_CUSTOMER)
    }
    const booking: Bookings | null = await bookingRepository.create({
        check_in_date: check_in_date,
        check_out_date: check_out_date,
        status: status,
        num_of_guests: num_of_guests,
        rooms: is_customer || undefined,// changed soon...
        customers: customers

    })
    const savedBooking: Bookings | null = await bookingRepository.save(booking);
    return successResponse(res,savedBooking,MESSAGES.DATA_SUCCESS)
}   

export async function getBookingDetails(req: Request,res: Response) {
    const {status} = req.params;
    const get_booking_details = await bookingRepository.find({
        where: {status: status as Booking_Status}
    })

    if (!get_booking_details) {
        return sendErrorResponse(res,MESSAGES.NO_BOOKING)
    }
    return successResponse(res,get_booking_details,MESSAGES.DATA_SUCCESS)
}
