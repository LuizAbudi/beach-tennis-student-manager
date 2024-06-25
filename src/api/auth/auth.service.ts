import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/api/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/core/security';
import { User } from 'src/entities/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException();
    }
    if (!comparePassword(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };

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
