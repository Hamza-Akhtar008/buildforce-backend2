import { BaseEntity } from 'base.entity';
import { Job } from 'src/job/entities/job.entity';
import { LabourProfile } from 'src/labour-profile/entities/labour-profile.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { ApplicationStatus } from '../enums/enum';
@Entity('job_applications')
@Unique(['jobId', 'applicantId'])
export class JobApplicaiton extends BaseEntity {
  @Column()
  jobId: bigint;

  @JoinColumn({ name: 'jobId' })
  @ManyToOne(() => Job, (job) => job.jobApplications, { onDelete: 'CASCADE' })
  job: Job;

  @Column()
  applicantId: bigint;

  @JoinColumn({ name: 'applicantId' })
  @ManyToOne(
    () => LabourProfile,
    (labourProfile) => labourProfile.jobApplications,
    { onDelete: 'CASCADE' },
  )
  applicant: LabourProfile;

  @Column()
  coverLetter: string;

  @Column()
  startDate: string;

  @Column({ enum: ApplicationStatus, default: ApplicationStatus.pending })
  status: ApplicationStatus;
}
