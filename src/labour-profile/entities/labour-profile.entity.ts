import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExperienceRange, VerificationStatus } from '../enums/enum';
import { SkillLevel } from '../enums/enum';
import { User } from 'src/user/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';

@Entity('labour_profiles')
export class LabourProfile {
  @PrimaryGeneratedColumn('increment')
  id: bigint;

  @Column({ unique: true })
  userId: bigint;

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
  @OneToOne(() => User, (user) => user.labourProfile)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Skill, { eager: true })
  @JoinTable({
    name: 'labour_profile_skills',
    joinColumn: { name: 'labour_profile_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skill_id', referencedColumnName: 'id' },
  })
  skills: Skill[];
  // Relations - will need to be properly configured when other entities are created
  // @OneToMany(() => LabourSkill, labourSkill => labourSkill.labour)
  // skills: LabourSkill[];

  // @OneToMany(() => LabourProject, labourProject => labourProject.labour)
  // projects: LabourProject[];

  // @OneToMany(() => Interview, interview => interview.labour)
  // interviews: Interview[];

  // @OneToMany(() => Application, application => application.labour)
  // applications: Application[];
}
