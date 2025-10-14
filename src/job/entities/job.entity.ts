import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'base.entity';
import { WorkDuration, Shift } from '../enums/job.enums';
import { SkillLevel } from 'src/labour-profile/enums/enum';
import { Project } from 'src/project/entities/project.entity';
import { JobApplicaiton } from 'src/job-applicaiton/entities/job-applicaiton.entity';

@Entity('jobs')
export class Job extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  skillsRequired: string;

  @Column()
  salary: string;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: WorkDuration })
  workDuration: WorkDuration;

  @Column({ type: 'enum', enum: Shift })
  shift: Shift;

  @Column({ type: 'enum', enum: SkillLevel })
  skillLevel: SkillLevel;

  @Column({ type: 'bigint' })
  projectId: bigint;

  @ManyToOne(() => Project, (project) => project.jobs, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @OneToMany(() => JobApplicaiton, (jobApplication) => jobApplication.job)
  jobApplications: JobApplicaiton[];
}
