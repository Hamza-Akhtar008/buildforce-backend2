import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { VerificationStatus } from 'src/labour-profile/enums/enum';

@ApiTags('interview')
@Controller('interview')
export class InterviewController {
  constructor(
    private readonly interviewService: InterviewService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createInterviewDto: CreateInterviewDto) {
    // console.log(createInterviewDto, 'createInterviewDto');
    const data = await this.interviewService.create(createInterviewDto);
    await this.userService.updateStatus(
      createInterviewDto.candidateId,
      VerificationStatus.interview,
    );
    return data;
  }

  @Get()
  findAll() {
    return this.interviewService.findAll();
  }

  @Get('/labour/:labourId')
  findByLabourId(@Param('labourId') labourId: string) {
    return this.interviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterviewDto: UpdateInterviewDto,
  ) {
    return this.interviewService.update(+id, updateInterviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interviewService.remove(+id);
  }
}
