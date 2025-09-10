import { Request, Response } from "express";
import { roomRepository, hotelRepository, bookingRepository, customerRepository } from "../repository/repository";
import { sendErrorResponse, successResponse } from "../handleResponse/response";
import { MESSAGES } from "../constants/messages";
import { Customers } from "../entity/Customers";
import { Hotels } from "../entity/Hotels";
import { Rooms } from "../entity/Rooms";
import { UpdateResult } from "typeorm";
import { validateCondition } from "../utility/utility";
import { updateRoomDetails } from "./roomController";

export async function customerRoomBooking(req: Request, res: Response) {
    try {
        const { first_name, last_name, email, phone_number, password, id_proof_type, id_proof_number, is_active, hotels, rooms } = req.body;

        const is_room_available: Rooms | null = await roomRepository.findOne({ where: { id: rooms } });
        validateCondition(is_room_available?.is_available,MESSAGES.ROOMS_NOT_AVAILABLE)
        const is_hotel: Hotels | null = await hotelRepository.findOne({ where: { id: hotels } })
        validateCondition(is_hotel,MESSAGES.HOTEL_NOT_FOUND)
        const Customer: Customers | null = await customerRepository.create(
            {
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone_number: phone_number,
                password: password,
                id_proof_type: id_proof_type,
                id_proof_number: id_proof_number,
                is_active: is_active,
                rooms: is_room_available || undefined,
                hotels: is_hotel || undefined
            }
        )
        const savedCustomer: Customers | null = await customerRepository.save(Customer)
        validateCondition(savedCustomer,MESSAGES.NOT_CREATE_DB)
        return successResponse(res, savedCustomer, MESSAGES.DATA_SUCCESS)
    } catch (error) {
        console.log("error on customer create: ", error);
        return sendErrorResponse(res, MESSAGES.SERVER_FETCH_ERROR)
    }
}

export async function getAllCustomer(req: Request, res: Response) {
    try {
        const get_all_customers: Customers[] | null = await customerRepository.find();
        validateCondition(get_all_customers,MESSAGES.NO_CUSTOMER)
        return successResponse(res, get_all_customers, MESSAGES.DATA_SUCCESS)
    } catch (error) {
        return sendErrorResponse(res, MESSAGES.SERVER_FETCH_ERROR)
    }
}

export async function getAvailableCustomers(req: Request, res: Response) {
    try {
        const { is_active } = req.query;
        validateCondition(is_active,MESSAGES.IS_ACTIVE)
        const status: boolean = is_active === "true";
        const customers: Customers[] = await customerRepository.find({ where: { is_active: status } })
        return successResponse(res, customers, MESSAGES.DATA_SUCCESS)
    } catch (error) {
        return sendErrorResponse(res, MESSAGES.SERVER_FETCH_ERROR)
    }
}

export async function getCustomerById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        validateCondition(id,"id is undefined")
        const getData: Customers | null = await customerRepository.findOne({ where: { id: parseInt(id) } })
        validateCondition(getData,MESSAGES.NO_CUSTOMER)
        return successResponse(res, getData, MESSAGES.DATA_SUCCESS)
    } catch (error) {
        return sendErrorResponse(res, MESSAGES.SERVER_FETCH_ERROR)
    }
}

export async function updateCustomerActive(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (parseInt(id) !== updateData.id) {
            return sendErrorResponse(res, MESSAGES.NO_CUSTOMER)
        }

        const savedUpdateData: UpdateResult | null = await customerRepository.update({ id: parseInt(id) }, {
            id: updateData.id,
            first_name: updateData.first_name,
            last_name: updateData.last_name,
            email: updateData.email,
            phone_number: updateData.phone_number,
            password: updateData.password,
            id_proof_number: updateData.id_proof_number,
            id_proof_type: updateData.id_proof_type,
            is_active: updateData.is_active,
            hotels: updateData.hotelsId,
            rooms: updateData.roomsId
        })
        validateCondition(savedUpdateData,MESSAGES.NOT_UPDATE)
        const get_customerBy_id = await customerRepository.findOne({ where: { id: parseInt(id) } })
        const customer_is_active: boolean | undefined = get_customerBy_id?.is_active;

        updateRoomDetails(updateData.roomsId,customer_is_active)
        return successResponse(res, get_customerBy_id, MESSAGES.DATA_SUCCESS)
    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, MESSAGES.SERVER_FETCH_ERROR)
    }
}