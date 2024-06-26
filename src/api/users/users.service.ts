import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/users/user.entity';
import { UserType } from './enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .select(['user.email', 'user.id', 'user.userType'])
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAllStudents(): Promise<User[]> {
    return this.usersRepository.find({ where: { userType: UserType.STUDENT } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
