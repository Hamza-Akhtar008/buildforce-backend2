import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LabourProfileService } from './labour-profile.service';
import { CreateLabourProfileDto } from './dto/create-labour-profile.dto';
import { UpdateLabourProfileDto } from './dto/update-labour-profile.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('labour-profile')
export class LabourProfileController {
  constructor(private readonly labourProfileService: LabourProfileService) {}

  @ApiBody({ type: CreateLabourProfileDto })
  @Post()
  create(@Body() createLabourProfileDto: CreateLabourProfileDto) {
    return this.labourProfileService.create(createLabourProfileDto);
  }

  @Get()
  findAll() {
    return this.labourProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labourProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLabourProfileDto: UpdateLabourProfileDto,
  ) {
    return this.labourProfileService.update(+id, updateLabourProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labourProfileService.remove(+id);
  }
}
