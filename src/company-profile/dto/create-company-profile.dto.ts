import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyProfileDto {
  @ApiProperty({ description: 'User ID to attach the profile to', example: 1 })
  @IsNotEmpty()
  id: bigint;

  @ApiProperty({
    description: 'Company logo image file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  logo?: Express.Multer.File;

  @ApiProperty({ description: 'Company name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'About the company', required: false })
  @IsOptional()
  @IsString()
  about?: string;

  @ApiProperty({ description: 'Company location' })
  @IsString()
  @IsNotEmpty()
  location: string;
}
