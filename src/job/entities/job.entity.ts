import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { BaseEntity } from 'base.entity'
import { WorkDuration, Shift } from '../enums/job.enums'
import { SkillLevel } from 'src/labour-profile/enums/enum'
import { Project } from 'src/project/entities/project.entity'
import { JobApplicaiton } from 'src/job-applicaiton/entities/job-applicaiton.entity'

@Entity('jobs')
export class Job extends BaseEntity {
  @Column()
  title: string

  @Column({ type: 'text' })
  description: string // full text including all paragraphs & bullet points

  @Column({ nullable: true })
  hiringInfo?: string // e.g., "Hiring 10 Workers"

  @Column({ type: 'date', nullable: true })
  postedOn?: Date

  @Column({ type: 'date', nullable: true })
  startDate?: Date

  @Column({ type: 'enum', enum: WorkDuration })
  workDuration: WorkDuration // e.g., FULL_TIME, CONTRACT, PART_TIME

  @Column({ type: 'enum', enum: Shift })
  shift: Shift // e.g., DAY, NIGHT, FLEXIBLE

  @Column({ type: 'enum', enum: SkillLevel })
  skillLevel: SkillLevel // e.g., APPRENTICE, JOURNEYMAN, MASTER

  @Column()
  salary: string // or hourly rate (e.g. "$25/hr")

  @Column()
  location: string // short form like "Houston, TX 77070"

  @Column({ type: 'text', nullable: true })
  fullAddress?: string // optional extended address

  @Column({ type: 'simple-array', nullable: true })
  scheduleDays?: string[] // e.g. ["M", "T", "W", "Th", "F"]

  @Column({ nullable: true })
  shiftHours?: string // e.g. "6am - 4pm"

  @Column({ nullable: true })
  shiftNote?: string // e.g. "Times are subject to change"

  @Column({ type: 'simple-array', nullable: true })
  experience?: string[] // e.g. ["Commercial"]

  @Column({ type: 'simple-array', nullable: true })
  licenses?: string[] // e.g. ["TDLR - Apprentice Electrician"]

  @Column({ type: 'simple-array', nullable: true })
  skills?: string[] // e.g. ["Bending Conduit", "Rough In"]

  @Column({ type: 'simple-array', nullable: true })
  benefits?: string[] // e.g. ["Flexible Schedule", "Health Insurance"]

  @ManyToOne(() => Project, (project) => project.jobs, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project

  @Column({ type: 'bigint', nullable: true })
  projectId?: bigint

  @OneToMany(() => JobApplicaiton, (jobApplication) => jobApplication.job)
  jobApplications: JobApplicaiton[]
}
