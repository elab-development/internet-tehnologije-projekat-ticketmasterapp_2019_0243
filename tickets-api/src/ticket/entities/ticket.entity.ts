import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TicketType } from "../enums/enum";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    type:TicketType
}
