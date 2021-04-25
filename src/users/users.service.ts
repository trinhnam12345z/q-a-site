import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  signUp(createUserDto: CreateUserDto) : Promise<User>{
    const user = new User();
    user.fullName = createUserDto.fullName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }
  
  async update(id: number, updateUserDto: UpdateUserDto) :Promise<User> {
    const user = await this.userRepository.findOne(id);
    user.fullName = updateUserDto.fullName;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  signIn(dto: SignInDto) {
    return this.userRepository.findOne({ where: { email:dto.email, password: dto.password} });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
