import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'base.entity';
import { ProjectStatus } from '../enums/project-status.enum';
import { User } from 'src/user/entities/user.entity';
import { Job } from 'src/job/entities/job.entity';
import { CompanyProfile } from 'src/company-profile/entities/company-profile.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  budget: number;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.DRAFT,
  })
  status: ProjectStatus;

  @Column({ type: 'bigint' })
  ownerId: bigint;

  @ManyToOne(
    () => CompanyProfile,
    (companyProfile) => companyProfile.projects,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'ownerId' })
  owner: CompanyProfile;

  @OneToMany(() => Job, (job) => job.project)
  jobs: Job[];
}
