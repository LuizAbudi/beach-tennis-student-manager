import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      .select([
        'user.email',
        'user.id',
        'user.userType',
        'user.name',
        'user.userType',
      ])
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

  async deleteUser(
    userId: number,
    requestUserId: number,
  ): Promise<{ message: string }> {
    const userToDelete = await this.usersRepository.findOneBy({ id: userId });

    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const requestingUser = await this.usersRepository.findOneBy({
      id: requestUserId,
    });

    if (!requestingUser) {
      throw new NotFoundException(
        `Requesting user with ID ${requestUserId} not found`,
      );
    }

    const isTeacher = Boolean(requestingUser.teacher);
    const isSelf = userId === requestUserId;

    if (!isTeacher && !isSelf) {
      throw new ForbiddenException(`You are not allowed to delete this user`);
    }

    await this.usersRepository.delete(userId);
    return { message: `User with ID ${userId} deleted successfully` };
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
