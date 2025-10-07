import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ example: 'Web Development' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Can make websites' })
  @IsOptional()
  description: string;
}
