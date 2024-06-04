import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { RegisterUserDto } from "./dto/user.dtos";
import { hash, genSalt } from "bcryptjs";
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
        throw new ConflictException("Email is already taken!!!!");
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

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      const foundUser = await this.userRepository.findOne({
        where: { id },
      });

      if (!foundUser) throw new NotFoundException("User not found");

      return foundUser;
    } catch (error) {
      console.log(error);
    }
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
