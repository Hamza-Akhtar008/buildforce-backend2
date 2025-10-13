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
import { CompanyProfileService } from './company-profile.service';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerConfig } from '../common/config/multer.config';

@ApiTags('Company Profiles')
@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCompanyProfileDto })
  @UseInterceptors(AnyFilesInterceptor(multerConfig))
  @Post()
  create(
    @Body() createCompanyProfileDto: CreateCompanyProfileDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Map uploaded files to the DTO fields based on fieldname
    if (files && files.length > 0) {
      const fileMap = {
        logo: files.find((f) => f.fieldname === 'logo'),
      };

      Object.assign(createCompanyProfileDto, fileMap);
    }

    return this.companyProfileService.create(createCompanyProfileDto);
  }

  @Get()
  findAll() {
    return this.companyProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyProfileService.findOne(+id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateCompanyProfileDto })
  @UseInterceptors(AnyFilesInterceptor(multerConfig))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyProfileDto: UpdateCompanyProfileDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Map uploaded files to the DTO fields based on fieldname
    if (files && files.length > 0) {
      const fileMap = {
        logo: files.find((f) => f.fieldname === 'logo'),
      };

      Object.assign(updateCompanyProfileDto, fileMap);
    }

    return this.companyProfileService.update(+id, updateCompanyProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyProfileService.remove(+id);
  }
}
