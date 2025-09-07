import { Request, Response } from "express"
import { roomRepository } from "../repository/repository";
import { Rooms } from "../entity/Rooms";
import { getRoomDetails } from "../enums/roomsEnums";
import { successResponse,sendErrorResponse } from "../handleResponse/response";
import { MESSAGES } from "../constants/messages";


export async function getRooms(req: Request, res: Response) {
    try {
        const getRooms = await roomRepository.findBy({
            is_available: true
        })
        if (!getRooms || getRooms.length === 0) {
            return sendErrorResponse(res,MESSAGES.ROOMS_NOT_AVAILABLE)
        }
        return successResponse(res,getRooms,MESSAGES.DATA_SUCCESS)
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return sendErrorResponse(res,MESSAGES.SERVER_FETCH_ERROR)
    }
}

export async function createRooms(req: Request, res: Response) {
    try {
        const { room_number, room_type, is_available, hotelsId } = req.body;
        const price = getRoomDetails(room_type)
        if (price === 0) {
            return sendErrorResponse(res,MESSAGES.ROOMS_NOT_AVAILABLE)
        }
        
        const create_room = new Rooms()
        create_room.room_number = room_number;
        create_room.room_type = room_type;
        create_room.price_per_night = price;
        create_room.is_available = is_available;
        create_room.hotels = hotelsId;

        const savedRoom = await roomRepository.save(create_room)
        return successResponse(res,savedRoom,MESSAGES.DATA_SUCCESS)
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return sendErrorResponse(res,MESSAGES.SERVER_FETCH_ERROR)
    }
}