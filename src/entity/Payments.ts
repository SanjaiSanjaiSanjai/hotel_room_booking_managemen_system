import {Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,ManyToOne,CreateDateColumn} from "typeorm"
import { Payments_Status , Payments_Method_Status} from "../enums/paymentsEnums"
import { Bookings } from "./Bookings"
import { Customers } from "./Customers"

@Entity()
export class Payments {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type:"float"})
    amount!: number

    @Column({
        type: "enum",
        enum: Payments_Status
    })
    payment_status!: Payments_Status

    @Column({
        type: "enum",
        enum: Payments_Method_Status
    })
    payment_method!: Payments_Method_Status 

    @CreateDateColumn({type:"timestamp"})
    transaction_date!: Date

    @CreateDateColumn({type:"timestamp"})
    created_at!: Date

    @OneToOne(() => Bookings,(booking) => booking.payments)
    @JoinColumn()
    bookings!: Bookings

    @ManyToOne(() =>Customers, (customer) => customer.payments)
    customers!: Customers
}