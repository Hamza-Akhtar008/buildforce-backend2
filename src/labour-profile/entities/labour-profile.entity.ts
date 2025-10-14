import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExperienceRange, VerificationStatus } from '../enums/enum';
import { SkillLevel } from '../enums/enum';
import { User } from 'src/user/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { JobApplicaiton } from 'src/job-applicaiton/entities/job-applicaiton.entity';

@Entity('labour_profiles')
export class LabourProfile {
  @PrimaryColumn({ type: 'bigint' })
  id: bigint;
  @OneToOne(() => User, (user) => user.labourProfile)
  @JoinColumn({ name: 'id' })
  user: User;

  @Column({ nullable: true })
  resumeUrl?: string;

  @Column({ nullable: true })
  idProofUrl?: string;

  @Column({ nullable: true })
  certificateUrl?: string;

  @Column({ nullable: true })
  portfolioUrl?: string;

  @Column({ nullable: true })
  skillLevel?: SkillLevel;
  @Column({ nullable: true })
  experienceRange?: ExperienceRange;

  // Relationsd
  @Column({ nullable: true })
  skills?: string;

  @OneToMany(() => JobApplicaiton, (jobApplication) => jobApplication.applicant)
  jobApplications: JobApplicaiton[];
}
