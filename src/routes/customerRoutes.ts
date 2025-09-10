import {Router} from "express";
import { CUSTOMER_URL } from "../routesURL/URL";
import { customerRoomBooking,getAllCustomer,getAvailableCustomers,getCustomerById,updateCustomerActive } from "../controllers/customerController";

const customerRouter = Router();
// customerRoomBooking
customerRouter.post(CUSTOMER_URL.customer_details,customerRoomBooking)
// getCustomerRoomBooking
customerRouter.get(CUSTOMER_URL.get_customer_details,getAllCustomer)
//getCustomer is based on active
customerRouter.get(CUSTOMER_URL.get_customer_is_active,getAvailableCustomers)
//get single customer
customerRouter.get(CUSTOMER_URL.get_single_customer,getCustomerById)
//update customer
customerRouter.put(CUSTOMER_URL.update_customer_active, updateCustomerActive)


export default customerRouter;