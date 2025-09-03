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
            // return res.status(404).json({ message: "No available rooms found" });
            return sendErrorResponse(res,MESSAGES.ROOMS_NOT_AVAILABLE)
        }
        // return res.status(200).json(getRooms);
        return successResponse(res,getRooms,MESSAGES.DATA_SUCCESS)
    } catch (error) {
        console.error('Error fetching rooms:', error);
        // return res.status(500).json({ message: "Internal server error", error: error });
        return sendErrorResponse(res,MESSAGES.SERVER_FETCH_ERROR)
    }
}

export async function createRooms(req: Request, res: Response) {
    try {
        const { room_number, room_type, is_available } = req.body;
        const price = getRoomDetails(room_type)
        if (price === 0) {
            // return res.status(400).json({ message: "Invalid room type provided" });
            return sendErrorResponse(res,MESSAGES.ROOMS_NOT_AVAILABLE)
        }
        
        const create_room = new Rooms()
        create_room.room_number = room_number;
        create_room.room_type = room_type;
        create_room.price_per_night = price;
        create_room.is_available = is_available;

        const savedRoom = await roomRepository.save(create_room)
        // return res.status(201).json({
        //     message: "Room created successfully",
        //     hotel: savedRoom
        // });
        return successResponse(res,savedRoom,MESSAGES.DATA_SUCCESS)
    } catch (error) {
        console.error('Error fetching rooms:', error);
        // return res.status(500).json({ message: "Internal server error", error: error });
        return sendErrorResponse(res,MESSAGES.SERVER_FETCH_ERROR)
    }
}