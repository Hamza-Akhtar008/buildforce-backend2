import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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
  @IsNumber()
  candidateId: number;
}
