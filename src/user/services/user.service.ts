import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entites';
import { UserInterface } from '../interfaces';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async createUser(user: UserEntity): Promise<UserInterface>{
     const newUser = await  this.usersRepository.create(user);
     await this.usersRepository.save(newUser);
     return newUser
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}