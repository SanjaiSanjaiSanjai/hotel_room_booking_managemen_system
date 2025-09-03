import { Request, Response } from "express"
import { hotelRepository } from "../repository/repository";
import { Hotels } from "../entity/Hotels";
import { successResponse, sendErrorResponse } from "../handleResponse/response";
import { MESSAGES } from "../constants/messages";

export async function getAllHotels(req: Request, res: Response) {
    try {
        const hotels = await hotelRepository.find();
        if (!hotels) {
            return sendErrorResponse(res, MESSAGES.HOTEL_NOT_FOUND)
        }
        return successResponse(res,hotels,MESSAGES.DATA_SUCCESS)
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return sendErrorResponse(res, MESSAGES.SERVER_FETCH_ERROR)
    }
}

export async function createHotel(req: Request, res: Response) {
    try {
        const { name, address, contact_number, email, is_active, opening_time, closing_time, description } = req.body;

        const hotel_details = new Hotels()
        hotel_details.name = name
        hotel_details.address = address
        hotel_details.contact_number = contact_number
        hotel_details.email = email
        hotel_details.is_active = is_active
        hotel_details.opening_time = opening_time
        hotel_details.closing_time = closing_time
        hotel_details.description = description

        const savedHotel = await hotelRepository.save(hotel_details);
        return successResponse(res,savedHotel,MESSAGES.DATA_SUCCESS)
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return sendErrorResponse(res,MESSAGES.SERVER_FETCH_ERROR)
    }
}