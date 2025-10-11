import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInterviewDto {
  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsString()
  timeSlots: string;

  @ApiProperty({
    description: 'The id of the labour for which interview has to create',
  })
  @IsOptional()
  @ApiProperty({ example: '10-10-2025' })
  selectedDate: string;
  @IsOptional()
  @ApiProperty({ example: '10:00AM' })
  selectedTimeSlot: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  candidateId: number;
}
