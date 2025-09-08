import { AppDataSource } from "./data-source";
import express from "express";
import hotelRouters from "./routes/hotelRoutes";
import roomsRouter from "./routes/roomsRoutes";
import bookingRouter from "./routes/bookingRoutes";
import customerRouter from "./routes/customerRoutes";
import paymentRouter from "./routes/paymentRoutes";
import { BASE_URL } from "./routesURL/URL";

const PORT: number = 5000;
async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");

        const app = express();
        app.use(express.json())
        app.use(BASE_URL,hotelRouters)
        app.use(BASE_URL,roomsRouter)
        app.use(BASE_URL,bookingRouter)
        app.use(BASE_URL,customerRouter)
        app.use(BASE_URL,paymentRouter)

        app.listen(PORT,() => {
            console.log("Server is on...: ", PORT);
        })
    } catch (error) {
        console.log(error);
    }
}
main()