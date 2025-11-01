import { ApiProperty } from '@nestjs/swagger';
import { CreateCompanyProfileDto } from './create-company-profile.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRole } from 'src/user/entities/user.entity';

export class CreateCompanyrWithUserDto {
  @ApiProperty({
    type: CreateUserDto,
    example: {
      name: "Shah Enterprises",
      location: "Lahore, Pakistan",
      email: "shah@example.com",
      phone: "03001234567",
      password: "securePassword123",
      role: UserRole.Company,
    },
  })
  user: CreateUserDto;

  @ApiProperty({
    type: CreateCompanyProfileDto,
    example: {
      id: 1,
      name: "Tech Innovators Pvt Ltd",
      about:
        "Tech Innovators is a leading AI-based software company focusing on automation and intelligent systems.",
      location: "Lahore, Pakistan",
      logo: "https://example.com/company-logo.png",
    },
  })
  companyProfile: CreateCompanyProfileDto;
}
