import { IsOptional } from 'class-validator';
import { CompanyProfile } from 'src/company-profile/entities/company-profile.entity';
import { AdminProfile } from 'src/admin-profile/entities/admin-profile.entity';
import { LabourProfile } from 'src/labour-profile/entities/labour-profile.entity';
import { VerificationStatus } from 'src/labour-profile/enums/enum';
import { Project } from 'src/project/entities/project.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ContractorProfile } from 'src/contractor-profile/entities/contractor-profile.entity';

export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  Company = 'Company',
  Admin = 'Admin',
  Labour = 'Labour',
   Contractor = 'Contractor',
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

  @OneToOne(() => CompanyProfile, (companyProfile) => companyProfile.user)
  companyProfile?: CompanyProfile;

  @OneToOne(() => AdminProfile, (adminProfile) => adminProfile.user)
  adminProfile?: AdminProfile;

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.pending,
  })
  verificationStatus: VerificationStatus;
  @OneToOne(() => ContractorProfile, (contractorProfile) => contractorProfile.user)
contractorProfile?: ContractorProfile;

  // @OneToMany(() => Job, job => job.postedBy)
  // postedJobs: Job[];

  // @OneToMany(() => Interview, interview => interview.admin)
  // interviews: Interview[];
}
