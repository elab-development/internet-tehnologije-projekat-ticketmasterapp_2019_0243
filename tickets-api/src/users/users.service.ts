import { ConflictException, Injectable } from "@nestjs/common";
import { RegisterUserDto } from "./dto/user.dtos";
import { hash, genSalt } from "bcrypt";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async registerUser(createUserDto: RegisterUserDto): Promise<User> {
    try {
      const { email, password, name } = createUserDto;

      const existingUser = await this.findUserByEmail(email);

      if (existingUser) {
        throw new ConflictException("Email is already taken!!!");
      }

      const salt = await genSalt();
      const hashedPassword = await hash(password, salt);

      const [firstName, surname] = name.split(" ");

      const user = new User();
      user.email = email;
      user.password = hashedPassword;
      user.firstName = firstName;
      user.surname = surname;

      console.log(user);

      await this.userRepository.save(user);

      return user;
    } catch (error: any) {
      console.error("Error registering user: ", error.message);
      throw new Error("Unable to register user");
    }
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
