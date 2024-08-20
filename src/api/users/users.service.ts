import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/users/user.entity';
import { UserType } from '../../enums';

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
      .select(['user.email', 'user.id', 'user.userType', 'user.name'])
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

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateStatus(
    id: number,
    status: boolean,
  ): Promise<{ message: string }> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    user.status = status;
    await this.usersRepository.save(user);
    return { message: `User with id ${id} status updated successfully` };
  }
}
