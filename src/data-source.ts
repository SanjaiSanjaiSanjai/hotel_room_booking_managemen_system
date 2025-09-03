import "reflect-metadata";
import { DataSource } from "typeorm";
import { Hotels } from "./entity/Hotels";
import { Rooms } from "./entity/Rooms";
import { Bookings } from "./entity/Bookings";
import { Customers } from "./entity/Customers";
import { Payments } from "./entity/Payments";
import * as dotenv from 'dotenv';


dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME || "Typeorm_001",
    synchronize: true,
    logging: true,
    entities: [Hotels,Rooms,Customers,Bookings,Payments],
    subscribers: [],
    migrations: [],
})