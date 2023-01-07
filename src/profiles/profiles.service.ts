import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserWithEmbeddedProfileDto } from 'src/users/dto/create-user-with-embedded-profile.dto';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  async insertProfile(gender: string, photo: string): Promise<Profile> {
    const profile = new Profile();
    profile.gender = gender;
    profile.photo = photo;
    return await this.profilesRepository.save(profile);
  }

  async getProfiles(): Promise<Profile[]> {
    return await this.profilesRepository.find({ relations: ['user'] });
  }

  async updateProfile(
    id: number,
    createUserWithEmbeddedProfileDto: CreateUserWithEmbeddedProfileDto,
  ): Promise<Profile> {
    const profile = await this.profilesRepository.findOne({
      where: { id: id },
    });
    profile.gender = createUserWithEmbeddedProfileDto.profile.gender;
    profile.photo = createUserWithEmbeddedProfileDto.profile.photo;

    return await this.profilesRepository.save(profile);
  }

  // async deleteProfile(id: number): Promise<Profile> {
  //   const profile = await this.profilesRepository.findOne({
  //     where: { id: id },
  //   });
  //   if (!profile) {
  //     throw new NotFoundException('Could not found the profile');
  //   }
  //   return this.profilesRepository.remove(profile);
  // }
}
