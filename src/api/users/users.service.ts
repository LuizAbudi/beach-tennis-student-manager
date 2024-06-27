import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/users/user.entity';
import { PaymentStatus, UserType } from './enums';
import { Student } from 'src/entities/students/student.entity';
import moment from 'moment';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
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

  async updatePaymentStatus(studentId: number): Promise<void> {
    const student = await this.studentRepository.findOneBy({ id: studentId });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    const now = moment();
    const lastPayment = moment(student.lastPaymentDate);
    const daysSinceLastPayment = now.diff(lastPayment, 'days');

    student.paymentStatus =
      daysSinceLastPayment <= 30 ? PaymentStatus.PAID : PaymentStatus.PENDING;
    await this.studentRepository.save(student);
  }
}
