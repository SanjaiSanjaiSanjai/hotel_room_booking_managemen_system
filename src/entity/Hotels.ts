import {Entity,PrimaryGeneratedColumn,Column,OneToMany,CreateDateColumn} from "typeorm"
import { Rooms } from "./Rooms";
import { Customers } from "./Customers";

@Entity()
export class Hotels {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    address!: string

    @Column()
    contact_number!: string

    @Column({unique: true})
    email!: string

    @CreateDateColumn({type:"timestamp"})
    created_at!: Date

    @CreateDateColumn({type:"timestamp"})
    updated_at!: Date

    @Column()
    is_active!: boolean

    @Column({type: "time"})
    opening_time!: string

    @Column({type: "time"})
    closing_time!: string

    @Column()
    description!: string

    @OneToMany(()=> Rooms,(room) => room.hotels)
    rooms!: Rooms[]

    @OneToMany(()=> Customers,(customer) => customer.hotels)
    customers!: Customers[]
}