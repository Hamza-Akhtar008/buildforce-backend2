import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Job } from 'src/job/entities/job.entity';
import { Project } from 'src/project/entities/project.entity';

@Entity('contractor_profiles')
export class ContractorProfile {
 @PrimaryColumn({ type: 'bigint' })
  id: bigint;


  @Column({ nullable: true })
  businessName?: string;

  @Column({ nullable: true })
  registrationNumber?: string;

  @Column({ nullable: true })
  experienceYears?: number;

  @Column('text', { nullable: true })
  about?: string;


  @Column({ nullable: true })
  teamSize?: number;


  @Column({ nullable: true })
  logoUrl?: string;

  @Column({ nullable: true })
  website?: string;



  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => User, (user) => user.contractorProfile, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'id' })
  user: User;

}
