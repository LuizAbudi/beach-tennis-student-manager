import { Injectable, OnModuleInit } from '@nestjs/common';
import { AuthService } from 'src/api/auth/auth.service';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { UserType } from 'src/enums';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly authService: AuthService) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const defaultUser: CreateUserDto = {
      email: 'defaultuser@example.com',
      firstName: 'Default',
      lastName: 'User',
      userType: UserType.TEACHER,
      password: 'admin',
    };

    const userExists = await this.authService.doesUserExist(defaultUser.email);
    if (!userExists) {
      await this.authService.register(defaultUser);
    }
  }
}
