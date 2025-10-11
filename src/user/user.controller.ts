import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, AdminGuard } from 'src/auth/guard';
import { VerificationStatus } from 'src/labour-profile/enums/enum';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const userExists = await this.userService.findByEmail(createUserDto.email);
    console.log('i am user', userExists);
    if (userExists) throw new HttpException('User already exists', 400);
    return this.userService.create(createUserDto);
  }

  // @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get('status/:status')
  findByStatus(@Param('status') status: VerificationStatus) {
    return this.userService.findByStatus(status);
  }

  @UseGuards(AdminGuard)
  @Post(':id/status')
  updateUserStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.userService.updateStatus(+id, updateStatusDto.status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(BigInt(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
