import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { UserRole } from "./user-role.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  surname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserRole, (role) => role.id)
  @JoinColumn({ name: "role_id" })
  role: UserRole;

  @OneToMany(() => Ticket, ticket => ticket.user)
  tickets: Ticket[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
