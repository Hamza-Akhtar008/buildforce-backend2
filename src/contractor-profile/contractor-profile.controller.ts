import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { ContractorProfileService } from './contractor-profile.service';
import { CreateContractorProfileDto } from './dto/create-contractor-profile.dto';
import { UpdateContractorProfileDto } from './dto/update-contractor-profile.dto';
import { ContractorProfile } from './entities/contractor-profile.entity';

@Controller('contractor-profile')
@ApiTags('Contractor Profile') // 👈 Groups routes in Swagger UI
export class ContractorProfileController {
  constructor(private readonly contractorProfileService: ContractorProfileService) {}

  // ------------------------------------------------------
  // POST /contractor-profile
  // ------------------------------------------------------
  @Post()
  @ApiOperation({ summary: 'Create a new contractor profile' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateContractorProfileDto })
  @ApiResponse({
    status: 201,
    description: 'Contractor profile created successfully',
    type: ContractorProfile,
  })
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @UploadedFile() logo: Express.Multer.File,
    @Body() createContractorProfileDto: CreateContractorProfileDto,
  ) {
    const dtoWithFile = { ...createContractorProfileDto, logo };
    console.log(dtoWithFile)
    return this.contractorProfileService.create(dtoWithFile);
  }

  // ------------------------------------------------------
  // GET /contractor-profile
  // ------------------------------------------------------
  @Get()
  @ApiOperation({ summary: 'Get all contractor profiles' })
  @ApiResponse({
    status: 200,
    description: 'List of all contractor profiles',
    type: [ContractorProfile],
  })
  findAll() {
    return this.contractorProfileService.findAll();
  }

  // ------------------------------------------------------
  // GET /contractor-profile/:id
  // ------------------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Get contractor profile by ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1, description: 'Contractor ID' })
  @ApiResponse({
    status: 200,
    description: 'Contractor profile details',
    type: ContractorProfile,
  })
  findOne(@Param('id') id: string) {
    return this.contractorProfileService.findOne(+id);
  }

  // ------------------------------------------------------
  // PATCH /contractor-profile/:id
  // ------------------------------------------------------
  @Patch(':id')
  @ApiOperation({ summary: 'Update contractor profile' })
  @ApiParam({ name: 'id', type: 'number', example: 1, description: 'Contractor ID' })
  @ApiResponse({
    status: 200,
    description: 'Updated contractor profile',
    type: ContractorProfile,
  })
  update(
    @Param('id') id: string,
    @Body() updateContractorProfileDto: UpdateContractorProfileDto,
  ) {
    return this.contractorProfileService.update(+id, updateContractorProfileDto);
  }

  // ------------------------------------------------------
  // DELETE /contractor-profile/:id
  // ------------------------------------------------------
  @Delete(':id')
  @ApiOperation({ summary: 'Delete contractor profile by ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1, description: 'Contractor ID' })
  @ApiResponse({
    status: 200,
    description: 'Contractor profile deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.contractorProfileService.remove(+id);
  }
}
