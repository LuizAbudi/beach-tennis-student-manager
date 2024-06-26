import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './students.controller';
import { UsersService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UserType } from '../users/enums';

const createStudentDto: CreateStudentDto = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  email: 'test@test.com',
  password: 'teste123',
  userType: UserType.STUDENT,
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateStudentDto) =>
                Promise.resolve({ id: '1', ...user }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                firstName: 'firstName #1',
                lastName: 'lastName #1',
              },
              {
                firstName: 'firstName #2',
                lastName: 'lastName #2',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      usersController.create(createStudentDto);
      expect(usersController.create(createStudentDto)).resolves.toEqual({
        id: '1',
        ...createStudentDto,
      });
      expect(usersService.create).toHaveBeenCalledWith(createStudentDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(usersController.findOne(1)).resolves.toEqual({
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        id: 1,
      });
      expect(usersService.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      usersController.remove('2');
      expect(usersService.remove).toHaveBeenCalled();
    });
  });
});
