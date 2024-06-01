import { Event } from "src/events/entities/events.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @OneToMany(() => Event, (event) => event.place)
  events: Event[];

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
