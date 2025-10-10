import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';
import {
  IsEmail,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { VerificationStatus } from 'src/labour-profile/enums/enum';

export class CreateUserDto {
  @ApiProperty({ example: 'Hamza Akhtar' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'hamza@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: '+923216032104' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '47 W 13th St, New York, NY 10011, USA' })
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1234', minLength: 3 })
  @MinLength(3)
  password: string;
  @ApiProperty({ enum: UserRole, example: UserRole.Labour })
  @IsEnum(UserRole)
  role: UserRole;

  // @IsOptional()
  // @IsEnum(VerificationStatus)
  // verificationStatus: VerificationStatus;
}
