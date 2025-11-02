import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateContractorProfileDto {

  @ApiProperty({ description: 'Name of the contractor’s business', example: 'BuildForce Contractors', required: false })
  @IsOptional()
  @IsString()
  businessName?: string;

  @ApiProperty({ description: 'Business registration number', example: 'REG-12345', required: false })
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiProperty({ description: 'Years of experience', example: 5, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)   // ✅ converts string -> number
  experienceYears?: number;

  @ApiProperty({ description: 'Short bio or about section', example: 'We specialize in residential and commercial construction.', required: false })
  @IsOptional()
  @IsString()
  about?: string;

  @ApiProperty({ description: 'Total team size', example: 15, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)   // ✅ converts string -> number
  teamSize?: number;

  @ApiProperty({
    description: 'Logo image file upload',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  logo?: Express.Multer.File;

  @ApiProperty({ description: 'Website URL', example: 'https://buildforce.com', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ description: 'User ID (authenticated user)', example: 42, required: false })
  @IsOptional()
  @Type(() => Number)  // ✅ converts string -> number
  @IsNumber()
  id?: number;
}
