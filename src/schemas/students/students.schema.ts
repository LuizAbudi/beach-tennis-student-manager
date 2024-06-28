import { User } from 'src/entities/users/user.entity';
import { PaymentStatus, PaymentValue } from 'src/enums';

export class StudentsProfileSchema {
  id: number;
  level: string;
  paymentStatus: PaymentStatus;
  paymentDate: number;
  paymentValue: PaymentValue;
  lastPaymentDate: Date;
  user: User;
}
