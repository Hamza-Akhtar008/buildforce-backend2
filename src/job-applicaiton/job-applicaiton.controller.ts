import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobApplicaitonService } from './job-applicaiton.service';
import { CreateJobApplicaitonDto } from './dto/create-job-applicaiton.dto';
import { UpdateJobApplicaitonDto } from './dto/update-job-applicaiton.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('job-applicaiton')
@ApiTags('Job Applications')
export class JobApplicaitonController {
  constructor(private readonly jobApplicaitonService: JobApplicaitonService) {}

  @Post()
  create(@Body() createJobApplicaitonDto: CreateJobApplicaitonDto) {
    return this.jobApplicaitonService.create(createJobApplicaitonDto);
  }

  @Get()
  findAll() {
    return this.jobApplicaitonService.findAll();
  }

  @Get('owner/:ownerId')
  findByOwnerId(@Param('ownerId') ownerId: string) {
    return this.jobApplicaitonService.findByOwnerId(BigInt(ownerId));
  }

  @Get('job/:jobId')
  findByJobId(@Param('jobId') jobId: string) {
    return this.jobApplicaitonService.findByJobId(BigInt(jobId));
  }

  @Get('applicant/:applicantId')
  findByApplicantId(@Param('applicantId') applicantId: string) {
    return this.jobApplicaitonService.findByApplicantId(BigInt(applicantId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobApplicaitonService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobApplicaitonDto: UpdateJobApplicaitonDto,
  ) {
    return this.jobApplicaitonService.update(+id, updateJobApplicaitonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobApplicaitonService.remove(+id);
  }
}
