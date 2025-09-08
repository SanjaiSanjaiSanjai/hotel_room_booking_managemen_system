import { Request, Response } from "express";
import { bookingRepository, customerRepository, paymentRepository } from "../repository/repository";
import { Bookings } from "../entity/Bookings";
import { sendErrorResponse, successResponse } from "../handleResponse/response";
import { MESSAGES } from "../constants/messages";
import { Customers } from "../entity/Customers";
import { Payments_Method_Status, Payments_Status } from "../enums/paymentsEnums";
import { Payments } from "../entity/Payments";
export async function payment(req: Request, res: Response) {
    try {
        const { amount, payment_status, payment_method, bookings, customers } = req.body;

        const IS_BOOKED: Bookings | null = await bookingRepository.findOne({ where: { id: bookings } })
        if (IS_BOOKED === null) {
            return sendErrorResponse(res, MESSAGES.NO_BOOKING)
        }
        const IS_CUSTOMER: Customers | null = await customerRepository.findOne({ where: { id: customers } })
        if (IS_CUSTOMER === null) {
            return sendErrorResponse(res, MESSAGES.NO_CUSTOMER)
        }
        const IS_PAYMENT_STATUS: boolean = Object.values(Payments_Status).includes(payment_status)
        const IS_PAYMENT_METHOD: boolean = Object.values(Payments_Method_Status).includes(payment_method)
        if (!IS_PAYMENT_STATUS) {
            return sendErrorResponse(res, MESSAGES.PAYMENT_STATUS_TYPE)
        }
        if (!IS_PAYMENT_METHOD) {
            return sendErrorResponse(res, MESSAGES.PAYMENT_METHOD)
        }
        const PAID: Payments | null = await paymentRepository.create({
            amount: amount,
            payment_status: payment_status,
            payment_method: payment_method,
            bookings: IS_BOOKED,
            customers: IS_CUSTOMER
        })
        const savedPayment: Payments | null = await paymentRepository.save(PAID)
        return successResponse(res, PAID, MESSAGES.DATA_SUCCESS)
    } catch (error) {
        return sendErrorResponse(res, MESSAGES.SERVER_FETCH_ERROR)
    }
}

export async function getPaymentDetails(req: Request, res: Response) {
    try {
        const { status } = req.params;

        const GET_PAYMENT_BY_STATUS = await paymentRepository.find({
            where: { payment_status: status as Payments_Status } 
        });

        console.log("payment details: ", GET_PAYMENT_BY_STATUS);
        return successResponse(res, GET_PAYMENT_BY_STATUS, MESSAGES.DATA_SUCCESS);
    } catch (error) {
        return sendErrorResponse(res, MESSAGES.SERVER_FETCH_ERROR);
    }
}

