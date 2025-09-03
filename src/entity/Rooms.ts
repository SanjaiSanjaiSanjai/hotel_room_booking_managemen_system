import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany,CreateDateColumn} from "typeorm";
import { Hotels } from "./Hotels";
import { Bookings } from "./Bookings";
import { Rooms_Type } from "../enums/roomsEnums";

@Entity()
export class Rooms {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    room_number!: number

    @Column({
        type: "enum",
        enum: Rooms_Type
    })
    room_type!: Rooms_Type

    @Column("float")
    price_per_night!: number

    @Column()
    is_available!: boolean

    @CreateDateColumn({type:"timestamp"})
    created_at!: Date

    @CreateDateColumn({type:"timestamp"})
    updated_at!: Date

    @ManyToOne(()=> Hotels,(hotel) => hotel.rooms)
    hotels!: Hotels    

    @OneToMany(() => Bookings,(booking) => booking.rooms)
    bookings!: Bookings[]
}