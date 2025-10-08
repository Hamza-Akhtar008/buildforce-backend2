import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExperienceRange, VerificationStatus } from '../enums/enum';
import { SkillLevel } from '../enums/enum';
import { User } from 'src/user/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';

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

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.pending,
  })
  verificationStatus: VerificationStatus;

  // Relations

  @Column({ nullable: true })
  skills?: string;
}
