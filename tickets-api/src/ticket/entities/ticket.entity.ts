import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TicketType } from "../enums/enum";
import { User } from "src/users/entities/user.entity";
import { Event } from "src/events/entities/events.entity";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type:TicketType

    @ManyToOne(() => User, user => user.tickets)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Event, event => event.tickets)
    @JoinColumn({ name: "event_id" })
    event: Event;

}
