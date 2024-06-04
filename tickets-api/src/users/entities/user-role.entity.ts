import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { RoleNameEnum } from "src/common/enums";

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: RoleNameEnum;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}