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
import { UserService } from 'src/user/user.service';
import { CreateCompanyrWithUserDto } from './dto/create-company-profile-with-user.dto';

@ApiTags('Company Profiles')
@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService,private readonly userService: UserService,) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCompanyrWithUserDto })
  @UseInterceptors(AnyFilesInterceptor(multerConfig))
  @Post()
  async create(
    @Body() body: CreateCompanyrWithUserDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const { user,companyProfile } = body;

    // 1️⃣ Create user first
    const newUser = await this.userService.create(user);

    // 2️⃣ Attach uploaded file (logo)
    if (files && files.length > 0) {
      companyProfile.logo = files.find((f) => f.fieldname === 'logo');
    }

    // 3️⃣ Link userId to company profile
    const companyprofile = await this.companyProfileService.create({
      ...companyProfile,
      id: newUser.id,
    });

    return {
      message: 'User and company profile created successfully',
      user: newUser,
      companyProfile,
    };
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
