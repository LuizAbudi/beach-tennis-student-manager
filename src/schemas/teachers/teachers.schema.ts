import { User } from 'src/entities/users/user.entity';

export class TeachersProfileSchema {
  id: number;
  availableDates: string;
  user: User;
}
