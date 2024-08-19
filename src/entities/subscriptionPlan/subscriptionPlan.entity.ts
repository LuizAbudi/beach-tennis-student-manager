import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../students/student.entity';

@Entity()
export class SubscriptionPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Nome do plano', description: '' })
  @Column({ nullable: false })
  planName: string;

  @ApiProperty({ example: 'Valores do plano', description: '180, 240, 320' })
  @Column({ nullable: false })
  planValue: number;

  @ApiProperty({
    example: 'Numero de aulas na semana',
    description: '1, 2, 3, 4 ou 5',
  })
  @Min(1)
  @Max(5)
  @Column({ nullable: false })
  numberOfClasses: number;

  @OneToMany(() => Student, (student) => student.subscriptionPlan)
  students: Student[];
}
