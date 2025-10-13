import {
  Entity,
  Column,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from 'base.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('company_profiles')
export class CompanyProfile {
  @PrimaryColumn({ type: 'bigint' })
  id: bigint;
  @OneToOne(() => User, (user) => user.labourProfile)
  @JoinColumn({ name: 'id' })
  user: User;
  @Column()
  name: string;

  @Column({ nullable: true })
  logoUrl?: string;

  @Column({ type: 'text', nullable: true })
  about?: string;

  @Column()
  location: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
