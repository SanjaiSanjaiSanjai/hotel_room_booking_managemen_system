export const BASE_URL = "/api/v1"

export const HOTELS_URL = {
    getAll: "/hotels/getAll",
    create: "/hotels/create"
}

export const ROOMS_URL = {
    getAll: "/rooms/getAll",
    create: "/rooms/create"
    //add room update router
}

export const BOOKING_URL = {
    booking: "/booking/booked",
    get_booking_details: "/booking/:status" // <-- use route param
}

export const CUSTOMER_URL = {
    customer_details: "/customer/details",
    get_customer_details: "/customer/getdetails",
    get_customer_is_active: "/customer/getdetails/active",
    get_single_customer: "/customer/getdetails/:status",
    update_customer_active: "/customer/active/:id"
}

export const PAYMENT_URL = {
    pay_amount: "/payment/pay",
    get_payment_details: "/payment/transaction/:status"
}