import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogInResponse } from 'src/schemas/auth/auth.schemas';
import {
  Oauth2SignInSchema,
  UserSignInSchema,
} from 'src/schemas/users/users.schemas';
import { Public } from '../../decorators/public.decorator';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

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
