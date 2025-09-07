import { AppDataSource } from "../data-source";
import { Hotels } from "../entity/Hotels";
import { Rooms } from "../entity/Rooms";
import { Customers } from "../entity/Customers";
import { Bookings } from "../entity/Bookings";


export const hotelRepository = AppDataSource.getRepository(Hotels);
export const roomRepository = AppDataSource.getRepository(Rooms);
export const customerRepository = AppDataSource.getRepository(Customers);
export const bookingRepository = AppDataSource.getRepository(Bookings);