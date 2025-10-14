import { PartialType } from '@nestjs/swagger';
import { CreateJobApplicaitonDto } from './create-job-applicaiton.dto';

export class UpdateJobApplicaitonDto extends PartialType(CreateJobApplicaitonDto) {}
