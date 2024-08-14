import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogInResponse } from 'src/schemas/auth/auth.schemas';
import {
  Oauth2SignInSchema,
  UserProfileSchema,
  UserSignInSchema,
} from 'src/schemas/users/users.schemas';
import { Public } from '../../decorators/public.decorator';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserType } from 'src/enums';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({
    status: 200,
    type: UserProfileSchema,
  })
  @ApiResponse({
    status: 400,
    description: 'User already exists or invalid access code',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(AuthGuard)
  async register(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request,
  ) {
    if (await this.authService.doesUserExist(createUserDto.email)) {
      throw new BadRequestException('User already exists');
    }

    if (createUserDto.userType === UserType.STUDENT) {
      if (!createUserDto.level || !createUserDto.teacherId) {
        throw new BadRequestException(
          'Missing required fields: level, teacherId',
        );
      }

      if (!(await this.authService.doesTeacherExist(createUserDto.teacherId))) {
        throw new BadRequestException('Teacher does not exist');
      }
    }

    if (createUserDto.userType === UserType.TEACHER) {
      const token = request.headers['authorization']?.split(' ')[1];
      const user = await this.jwtService.decode(token);
      if (!user || user.userType !== 'teacher') {
        throw new UnauthorizedException('Only admins can create a teacher');
      }
    }

    return await this.authService.register(createUserDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LogInResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  signIn(@Body() signInDto: UserSignInSchema) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('oauth2/login')
  @ApiOperation({ summary: 'Login to docs' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LogInResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  signInDocs(@Body() signInDto: Oauth2SignInSchema) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
