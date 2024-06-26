import { Controller, Delete, Get, Param, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfileSchema } from 'src/schemas/users/users.schemas';
import { ApiOperation, ApiResponse, ApiTags, ApiOAuth2 } from '@nestjs/swagger';

@ApiOAuth2([], 'Authentication')
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiResponse({
    status: 200,
    type: UserProfileSchema,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Access Forbidden',
  })
  @ApiOperation({ summary: 'Get User Me' })
  getProfile(@Request() req) {
    return this.usersService.findById(req.user.sub);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    type: [UserProfileSchema],
  })
  @ApiResponse({
    status: 404,
    description: 'Users not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Access Forbidden',
  })
  findAll(): Promise<UserProfileSchema[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single user' })
  @ApiResponse({
    status: 200,
    type: UserProfileSchema,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Access Forbidden',
  })
  findOne(@Param('id') id: number): Promise<UserProfileSchema> {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 200,
    description: 'User Deletion Success',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Access Forbidden',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  // @Post()
  // @ApiOperation({ summary: 'Create user' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'User created successfully',
  //   type: User,
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Invalid input',
  // })
  // create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.usersService.create(createUserDto);
  // }
}
