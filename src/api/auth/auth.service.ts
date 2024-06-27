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
import { CreateUserSchema } from 'src/schemas/users/users.schemas';
import { Student } from 'src/entities/students/student.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserIn: CreateUserSchema): Promise<User> {
    const {
      email,
      firstName,
      lastName,
      userType,
      password,
      level,
      paymentDate,
      paymentValue,
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
      await this.studentRepository.save({
        user,
        level,
        paymentDate,
        paymentValue,
      });
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
        await this.usersService.updatePaymentStatus(student.id);
      }
    }

    const payload = {
      sub: user.id,
      email: user.email,
      userType: user.userType,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async doesUserExist(email: string): Promise<boolean> {
    const user = await this.usersService.findOne(email);
    if (user) {
      return true;
    }
    return false;
  }
}
