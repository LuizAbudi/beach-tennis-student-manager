import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/api/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from 'src/core/security';
import { User } from 'src/entities/users/user.entity';
import { Student } from 'src/entities/students/student.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { PaymentService } from '../payment/payment.service';
import { PaymentStatus } from 'src/enums';
import { Payment } from 'src/entities/payment/payment.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private usersService: UsersService,
    private paymentsService: PaymentService,
    private jwtService: JwtService,
  ) {}

  async register(createUserIn: CreateUserDto): Promise<User> {
    const {
      email,
      firstName,
      lastName,
      userType,
      password,
      level,
      paymentDate,
      paymentValue,
      teacherId,
      lastPaymentDate,
    } = createUserIn;
    const hashedPassword = hashPassword(password);

    const user = await this.usersRepository.save({
      email,
      firstName,
      lastName,
      userType,
      password: hashedPassword,
    });

    if (user.userType === 'student') {
      const teacher = await this.teacherRepository.findOne({
        where: { id: teacherId },
      });

      const student = await this.studentRepository.save({
        user,
        level,
        teacher,
      });

      const payment = await this.paymentRepository.save({
        student: student,
        paymentDate,
        paymentValue,
        paymentStatus: PaymentStatus.PENDING,
        lastPaymentDate: lastPaymentDate ?? null,
      });

      student.payment = payment;
      await this.studentRepository.save(student);
    } else {
      await this.teacherRepository.save({ user });
    }

    return user;
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException();
    }
    if (!comparePassword(password, user.password)) {
      throw new UnauthorizedException();
    }

    if (user.userType === 'student') {
      const student = await this.studentRepository.findOne({ where: { user } });
      if (student) {
        await this.paymentsService.updatePaymentStatus(
          student.id,
          PaymentStatus.PAID,
        );
      }
    }

    const payload = {
      sub: user.id,
      email: user.email,
      userType: user.userType,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async doesUserExist(email: string): Promise<boolean> {
    const user = await this.usersService.findOne(email);
    if (user) {
      return true;
    }
    return false;
  }

  async doesTeacherExist(teacherId: number): Promise<boolean> {
    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
    });
    if (teacher) {
      return true;
    }
    return false;
  }
}
