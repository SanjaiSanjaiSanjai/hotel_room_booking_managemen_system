import { Entity, PrimaryGeneratedColumn, Column ,ManyToOne,OneToMany,CreateDateColumn} from "typeorm";
import { Hotels } from "./Hotels";
import { Bookings } from "./Bookings";
import { Payments } from "./Payments";
import { Rooms } from "./Rooms";

@Entity()
export class Customers {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    first_name!: string

    @Column()
    last_name!: string

    @Column({ unique: true })
    email!: string

    @Column()
    phone_number!: string

    @Column()
    password!: string

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date

    @CreateDateColumn({ type: "timestamp" })
    updated_at!: Date

    @Column()
    id_proof_type!: string

    @Column()
    id_proof_number!: string

    @Column()
    is_active!: boolean

    @ManyToOne(()=> Hotels,(hotel) => hotel.customers)
    hotels!: Hotels

    @OneToMany(()=> Bookings,(booking) => booking.customers)
    bookings!: Bookings[]

    @OneToMany(()=> Payments,(payment) => payment.customers)
    payments!: Payments[]

    @ManyToOne(() => Rooms,(room) => room.customers)
    rooms!: Rooms
} 