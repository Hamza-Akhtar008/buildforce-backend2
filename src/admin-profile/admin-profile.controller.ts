import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminProfileService } from './admin-profile.service';
import { CreateAdminProfileDto } from './dto/create-admin-profile.dto';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';

@ApiTags('Admin Profiles')
@Controller('admin-profile')
export class AdminProfileController {
  constructor(private readonly adminProfileService: AdminProfileService) {}

  @Post()
  create(@Body() createAdminProfileDto: CreateAdminProfileDto) {
    return this.adminProfileService.create(createAdminProfileDto);
  }

  @Get()
  findAll() {
    return this.adminProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminProfileDto: UpdateAdminProfileDto,
  ) {
    return this.adminProfileService.update(+id, updateAdminProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminProfileService.remove(+id);
  }
}
