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

interface ITokenPayload {
  id: number;
  email: string;
  userType: string;
  name: string;
  teacherId: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserIn: CreateUserDto): Promise<User> {
    const { email, name, userType, password, level, paymentDate, teacherId } =
      createUserIn;
    const hashedPassword = hashPassword(password);

    const user = await this.usersRepository.save({
      email,
      name,
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
        paymentDate,
        teacher,
      });

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

    let payload: ITokenPayload;

    if (user.userType === 'teacher') {
      const teacher = await this.teacherRepository.findOne({
        where: { user: { id: user.id } },
      });
      if (!teacher) {
        throw new NotFoundException();
      } else {
        payload = {
          email: user.email,
          id: user.id,
          userType: user.userType,
          name: user.name,
          teacherId: teacher.id,
        };
      }
    } else {
      const student: Student = await this.studentRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['teacher'],
      });

      if (!student) {
        throw new NotFoundException();
      } else {
        payload = {
          email: user.email,
          id: user.id,
          userType: user.userType,
          name: user.name,
          teacherId: student.teacher.id,
        };
      }
    }

    return { access_token: await this.jwtService.signAsync(payload) };
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
