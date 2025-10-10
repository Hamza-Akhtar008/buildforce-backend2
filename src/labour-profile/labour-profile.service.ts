import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLabourProfileDto } from './dto/create-labour-profile.dto';
import { UpdateLabourProfileDto } from './dto/update-labour-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LabourProfile } from './entities/labour-profile.entity';
import { Repository } from 'typeorm';
import { S3Service } from '../common/services/s3.service';
import { VerificationStatus } from './enums/enum';

import { UserService } from 'src/user/user.service';

@Injectable()
export class LabourProfileService {
  @InjectRepository(LabourProfile)
  private readonly labourProfileRepository: Repository<LabourProfile>;

  constructor(
    private readonly s3Service: S3Service,
    private readonly userService: UserService,
  ) {}

  async create(createLabourProfileDto: CreateLabourProfileDto) {
    const { resume, idProof, certificate, portfolio, id, ...profileData } =
      createLabourProfileDto;
    const alreadyExist = await this.labourProfileRepository.findOne({
      where: { id: BigInt(id) },
    });
    if (alreadyExist) {
      throw new BadRequestException('Labour profile already exists');
    }

    // Upload files to S3 and get URLs
    const uploadPromises = [];
    const fileFields = { resume, idProof, certificate, portfolio };

    for (const [fieldName, file] of Object.entries(fileFields)) {
      if (file) {
        uploadPromises.push(
          this.s3Service
            .uploadFile(file, `labour-profiles/user-${id}/${fieldName}`)
            .then((url) => ({ fieldName, url })),
        );
      }
    }

    const uploadResults = await Promise.all(uploadPromises);

    // Create the profile data with uploaded URLs
    // Set id to userId since they should be the same (id is the foreign key to users table)
    const profileToSave = { id: id, ...profileData };
    uploadResults.forEach(({ fieldName, url }) => {
      profileToSave[`${fieldName}Url`] = url;
    });
    this.userService.updateStatus(Number(id), VerificationStatus.submitted);

    return this.labourProfileRepository.save(profileToSave);
  }

  findAll() {
    return this.labourProfileRepository.find();
  }

  async findOne(id: number) {
    const obj = await this.labourProfileRepository.findOne({
      where: { id: BigInt(id) },
    });
    if (!obj) {
      throw new NotFoundException('Labour profile not found');
    }
    return obj;
  }

  async update(id: number, updateLabourProfileDto: UpdateLabourProfileDto) {
    const existingProfile = await this.labourProfileRepository.findOne({
      where: { id: BigInt(id) },
    });
    if (!existingProfile) {
      throw new NotFoundException('Labour profile not found');
    }

    const {
      resume,
      idProof,
      certificate,
      portfolio,
      id: _,
      ...profileData
    } = updateLabourProfileDto;

    // Upload new files to S3 and get URLs
    const uploadPromises = [];
    const fileFields = { resume, idProof, certificate, portfolio };

    for (const [fieldName, file] of Object.entries(fileFields)) {
      if (file) {
        uploadPromises.push(
          this.s3Service
            .uploadFile(
              file,
              `labour-profiles/user-${id || existingProfile.id}/${fieldName}`,
            )
            .then((url) => ({ fieldName, url })),
        );
      }
    }

    const uploadResults = await Promise.all(uploadPromises);

    // Create the update data with uploaded URLs
    const updateData = { ...profileData };
    uploadResults.forEach(({ fieldName, url }) => {
      updateData[`${fieldName}Url`] = url;
    });

    // Only update fields that are provided
    Object.assign(existingProfile, updateData);

    return this.labourProfileRepository.save(existingProfile);
  }

  async remove(id: number) {
    return await this.labourProfileRepository.delete(id);
  }
}
