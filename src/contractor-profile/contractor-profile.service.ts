import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractorProfile } from './entities/contractor-profile.entity';
import { CreateContractorProfileDto } from './dto/create-contractor-profile.dto';
import { UpdateContractorProfileDto } from './dto/update-contractor-profile.dto';
import { S3Service } from '../common/services/s3.service';
import { UserService } from '../user/user.service';


@Injectable()
export class ContractorProfileService {
  constructor(
    @InjectRepository(ContractorProfile)
    private readonly contractorProfileRepository: Repository<ContractorProfile>,
    private readonly s3Service: S3Service,
    private readonly userService: UserService,
  ) {}

  /**
   * CREATE contractor profile (with file upload)
   */
async create(createContractorProfileDto: CreateContractorProfileDto) {
  const { id: userId, logo, ...profileData } = createContractorProfileDto;

  // 1️⃣ Fetch the user by ID
  const user = await this.userService.findOne(BigInt(userId));
  if (!user) {
    throw new NotFoundException(`User #${userId} not found`);
  }

  // 2️⃣ Check if contractor profile already exists for this user
  const alreadyExist = await this.contractorProfileRepository.findOne({
    where: { user: { id: BigInt(userId) } },
  });

  if (alreadyExist) {
    throw new BadRequestException('Contractor profile already exists for this user');
  }

  // 3️⃣ Handle file uploads
  const fileFields = { logo };
  const uploadPromises = [];

  for (const [fieldName, file] of Object.entries(fileFields)) {
    if (file) {
      uploadPromises.push(
        this.s3Service
          .uploadFile(file, `contractor-profiles/user-${userId}/${fieldName}`)
          .then((url) => ({ fieldName, url })),
      );
    }
  }

  const uploadResults = await Promise.all(uploadPromises);

  // 4️⃣ Build profile object
  const profileToSave: any = {
    ...profileData,
    user, // 👈 link to user
  };

  uploadResults.forEach(({ fieldName, url }) => {
    profileToSave[`${fieldName}Url`] = url;
  });

  // 5️⃣ Optional: update user verification status


  // 6️⃣ Save the contractor profile
  return this.contractorProfileRepository.save(profileToSave);
}

  /**
   * GET all profiles
   */
  async findAll() {
    return this.contractorProfileRepository.find({ relations: ['user'] });
  }

  /**
   * GET single profile
   */
 async findOne(id: number) {
  const profile = await this.contractorProfileRepository.findOne({
    where: { id: BigInt(id) }, // ✅ Convert number to bigint
    relations: ['user'],
  });

  if (!profile)
    throw new NotFoundException(`Contractor profile #${id} not found`);

  return profile;
}


  /**
   * UPDATE profile
   */
  async update(id: number, dto: UpdateContractorProfileDto) {
    const profile = await this.findOne(id);
    Object.assign(profile, dto);
    return this.contractorProfileRepository.save(profile);
  }

  /**
   * DELETE profile
   */
  async remove(id: number) {
    const profile = await this.findOne(id);
    await this.contractorProfileRepository.remove(profile);
    return { message: `Contractor profile #${id} deleted successfully` };
  }
}
