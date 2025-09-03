import { AppDataSource } from "../data-source";
import { Hotels } from "../entity/Hotels";
import { Rooms } from "../entity/Rooms";


export const hotelRepository = AppDataSource.getRepository(Hotels);
export const roomRepository = AppDataSource.getRepository(Rooms);