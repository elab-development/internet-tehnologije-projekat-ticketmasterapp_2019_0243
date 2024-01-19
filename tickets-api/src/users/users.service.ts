import { Injectable } from "@nestjs/common";
import { RegisterUserDto } from "./dto/user.dtos";
import * as bcrypt from "bcrypt";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async registerUser(createUserDto: RegisterUserDto) {
    const { email, password, name } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const [firstName, surname] = name.split(" ");

    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    user.firstName = firstName;
    user.surname = surname;

    await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
