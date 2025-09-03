import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToOne,CreateDateColumn} from "typeorm"
import { Booking_Status } from "../enums/bookingEnums"
import { Rooms } from "./Rooms"
import { Customers } from "./Customers"
import { Payments } from "./Payments"

@Entity()
export class Bookings{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type:"timestamp"})
    check_in_date!: Date

    @Column({type:"timestamp"})
    check_out_date!: Date

    @Column({
        type: "enum",
        enum: Booking_Status
    })
    status!: Booking_Status

    
    @CreateDateColumn({type:"timestamp"})
    created_at!: Date

    @CreateDateColumn({type:"timestamp"})
    updated_at!: Date

    @Column()
    num_of_guests!: number

    @ManyToOne(()=> Rooms,(room) => room.bookings)
    rooms!: Rooms

    @ManyToOne(()=> Customers,(customer) => customer.bookings)
    customers!: Customers

    @OneToOne(() => Payments,(payment) => payment.bookings)
    payments!: Payments
}