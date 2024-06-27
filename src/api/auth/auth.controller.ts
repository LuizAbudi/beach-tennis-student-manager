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
  CreateUserSchema,
  Oauth2SignInSchema,
  UserProfileSchema,
  UserSignInSchema,
} from 'src/schemas/users/users.schemas';
import { Public } from '../../decorators/public.decorator';
import { AuthService } from './auth.service';
import { User } from 'src/entities/users/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

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
    @Body() createUserSchema: CreateUserSchema,
    @Req() request: Request,
  ): Promise<User> {
    if (await this.authService.doesUserExist(createUserSchema.email)) {
      throw new BadRequestException('User already exists');
    }

    switch (createUserSchema.userType) {
      case 'student':
        if (!createUserSchema.level) {
          throw new BadRequestException('Level is required for students');
        }
        if (!createUserSchema.paymentValue) {
          throw new BadRequestException(
            'Payment value is required for students',
          );
        }
        if (!createUserSchema.paymentDate) {
          throw new BadRequestException(
            'Payment date is required for students',
          );
        }
        break;
      case 'teacher':
        const token = request.headers['authorization']?.split(' ')[1];
        const user = await this.jwtService.decode(token);
        if (!user || user.userType !== 'teacher') {
          throw new UnauthorizedException('Only admins can create a teacher');
        }
        if (
          createUserSchema.level ||
          createUserSchema.paymentValue ||
          createUserSchema.paymentDate
        ) {
          throw new BadRequestException(
            'Teachers cannot have level, payment value or payment date',
          );
        }
        break;
      default:
        throw new BadRequestException('Invalid user type');
    }

    return await this.authService.register(createUserSchema);
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
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
