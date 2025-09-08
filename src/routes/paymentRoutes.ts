import {Router} from "express";
import { payment,getPaymentDetails } from "../controllers/paymetController";
import { PAYMENT_URL } from "../routesURL/URL";

const paymentRouter = Router();
// pay case
paymentRouter.post(PAYMENT_URL.pay_amount,payment)
// get payment details
paymentRouter.get(PAYMENT_URL.get_payment_details,getPaymentDetails)

export default paymentRouter;