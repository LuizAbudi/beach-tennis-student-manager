import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/users/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { TeachersService } from '../teachers/teachers.service';
import { UserType } from './enums';
import { hashPassword } from 'src/core/security';
import { Student } from 'src/entities/students/student.entity';
import { StudentsService } from '../students/students.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => TeachersService))
    private readonly teachersService: TeachersService,
    @Inject(forwardRef(() => StudentsService))
    private readonly studentsService: StudentsService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .select(['user.email', 'user.id'])
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, firstName, lastName, userType, password, teacherId } =
      createUserDto;
    const hashedPassword = hashPassword(password);

    const newUser = new User();
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.userType = userType;
    newUser.password = hashedPassword;

    const savedUser = await this.usersRepository.save(newUser);

    if (savedUser.userType === UserType.TEACHER) {
      const teacher = new Teacher();
      teacher.email = email;
      teacher.firstName = firstName;
      teacher.lastName = lastName;
      teacher.password = hashedPassword;
      teacher.user = savedUser;
      const savedTeacher = await this.teachersService.create(teacher);

      savedUser.teacherId = savedTeacher.id;
      await this.usersRepository.save(savedUser);
    } else if (savedUser.userType === UserType.STUDENT) {
      if (!teacherId) {
        throw new BadRequestException('teacherId is required for students');
      }
      const teacher = await this.teachersService.findById(teacherId);
      if (!teacher) {
        throw new NotFoundException('Teacher not found');
      }
      const student = new Student();
      student.email = email;
      student.firstName = firstName;
      student.lastName = lastName;
      student.password = hashedPassword;
      student.user = savedUser;
      student.teacher = teacher;
      const savedStudent = await this.studentsService.create(student);

      savedUser.studentId = savedStudent.id;
      await this.usersRepository.save(savedUser);
    }

    return savedUser;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
