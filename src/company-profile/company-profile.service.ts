import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { CompanyProfile } from './entities/company-profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/common/services/s3.service';
import { UserService } from 'src/user/user.service';
import { VerificationStatus } from 'src/labour-profile/enums/enum';

@Injectable()
export class CompanyProfileService {
  @InjectRepository(CompanyProfile)
  private readonly companyProfileRepository: Repository<CompanyProfile>;

  constructor(
    private readonly s3Service: S3Service,
    private readonly userService: UserService,
  ) {}

  async create(createCompanyProfileDto: CreateCompanyProfileDto) {
    const { logo, id, ...profileData } = createCompanyProfileDto;

    const alreadyExist = await this.companyProfileRepository.findOne({
      where: { id: BigInt(id) },
    });
    if (alreadyExist) {
      throw new BadRequestException('Company profile already exists');
    }

    // Upload logo to S3 and get URL
    let logoUrl: string | undefined;
    if (logo) {
      logoUrl = await this.s3Service.uploadFile(
        logo,
        `company-profiles/user-${id}/logo`,
      );
    }

    // Create the profile data with uploaded URL
    const profileToSave = {
      id: id,
      ...profileData,
      logoUrl,
    };

    // Update user verification status
    this.userService.updateStatus(Number(id), VerificationStatus.submitted);

    return this.companyProfileRepository.save(profileToSave);
  }

  findAll() {
    return this.companyProfileRepository.find();
  }

  async findOne(id: number) {
    const obj = await this.companyProfileRepository.findOne({
      where: { id: BigInt(id) },
    });
    if (!obj) {
      throw new NotFoundException('Company profile not found');
    }
    return obj;
  }

  async update(id: number, updateCompanyProfileDto: UpdateCompanyProfileDto) {
    const existingProfile = await this.companyProfileRepository.findOne({
      where: { id: BigInt(id) },
    });
    if (!existingProfile) {
      throw new NotFoundException('Company profile not found');
    }

    const { logo, id: _, ...profileData } = updateCompanyProfileDto;

    // Upload new logo to S3 and get URL
    let logoUrl: string | undefined;
    if (logo) {
      logoUrl = await this.s3Service.uploadFile(
        logo,
        `company-profiles/user-${id}/logo`,
      );
    }

    // Create the update data with uploaded URL
    const updateData: any = { ...profileData };
    if (logoUrl) {
      updateData.logoUrl = logoUrl;
    }

    // Only update fields that are provided
    Object.assign(existingProfile, updateData);

    return this.companyProfileRepository.save(existingProfile);
  }

  async remove(id: number) {
    return await this.companyProfileRepository.delete(id);
  }
}
