import { User } from 'src/entities/users/user.entity';

export class StudentsProfileSchema {
  id: number;
  level: string;
  user: User;
}
