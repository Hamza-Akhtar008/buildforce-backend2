import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { LabourProfileService } from './labour-profile.service';
import { CreateLabourProfileDto } from './dto/create-labour-profile.dto';
import { UpdateLabourProfileDto } from './dto/update-labour-profile.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerConfig } from '../common/config/multer.config';

@ApiTags('Labour Profiles')
@Controller('labour-profile')
export class LabourProfileController {
  constructor(private readonly labourProfileService: LabourProfileService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateLabourProfileDto })
  @UseInterceptors(AnyFilesInterceptor(multerConfig))
  @Post()
  create(
    @Body() createLabourProfileDto: CreateLabourProfileDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Map uploaded files to the DTO fields based on fieldname
    if (files && files.length > 0) {
      const fileMap = {
        resume: files.find((f) => f.fieldname === 'resume'),
        idProof: files.find((f) => f.fieldname === 'idProof'),
        certificate: files.find((f) => f.fieldname === 'certificate'),
        portfolio: files.find((f) => f.fieldname === 'portfolio'),
      };

      Object.assign(createLabourProfileDto, fileMap);
    }

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

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateLabourProfileDto })
  @UseInterceptors(AnyFilesInterceptor(multerConfig))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLabourProfileDto: UpdateLabourProfileDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Map uploaded files to the DTO fields based on fieldname
    if (files && files.length > 0) {
      const fileMap = {
        resume: files.find((f) => f.fieldname === 'resume'),
        idProof: files.find((f) => f.fieldname === 'idProof'),
        certificate: files.find((f) => f.fieldname === 'certificate'),
        portfolio: files.find((f) => f.fieldname === 'portfolio'),
      };

      Object.assign(updateLabourProfileDto, fileMap);
    }

    return this.labourProfileService.update(+id, updateLabourProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labourProfileService.remove(+id);
  }
}
