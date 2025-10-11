import { BaseEntity } from 'base.entity';
import { IsOptional } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('Interview')
export class Interview extends BaseEntity {
  @Column()
  date: string;

  @Column()
  timeSlots: string;

  @Column()
  candidateId: number;

  @Column({ nullable: true })
  selectedDate: string;

  @Column({ nullable: true })
  selectedTimeSlot: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate: User;
}
