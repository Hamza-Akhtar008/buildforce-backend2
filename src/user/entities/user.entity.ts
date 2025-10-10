import { IsOptional } from 'class-validator';
import { LabourProfile } from 'src/labour-profile/entities/labour-profile.entity';
import { VerificationStatus } from 'src/labour-profile/enums/enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Labour = 'Labour',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: bigint;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations - will need to be properly configured when other entities are created
  @OneToOne(() => LabourProfile, (labourProfile) => labourProfile.user)
  labourProfile?: LabourProfile;

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.pending,
  })
  verificationStatus: VerificationStatus;

  // @OneToMany(() => Job, job => job.postedBy)
  // postedJobs: Job[];

  // @OneToMany(() => Interview, interview => interview.admin)
  // interviews: Interview[];
}
