import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ProfilesService } from 'src/profiles/profiles.service';
import { PhotosService } from 'src/photos/photos.service';

import { CreateUserWithEmbeddedProfileDto } from './dto/create-user-with-embedded-profile.dto';

@Injectable()
export class UsersService {
  // we need the db repository
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly profilesService: ProfilesService,
  ) {}

  async insertUserWithEmbeddedProfile(
    createUserWithEmbeddedProfile: CreateUserWithEmbeddedProfileDto,
  ) {
    // insert the profile
    const profile = await this.profilesService.insertProfile(
      createUserWithEmbeddedProfile.profile.gender,
      createUserWithEmbeddedProfile.profile.photo,
    );
    // create user (with profile) and save it to db
    const user = new User();
    user.username = createUserWithEmbeddedProfile.username;
    user.password = createUserWithEmbeddedProfile.password;
    user.email = createUserWithEmbeddedProfile.email;
    user.profile = profile;
    return this.usersRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['profile'] });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { username: username },
    });
  }

  async updateOneUser(
    id: number,
    createUserWithEmbeddedProfileDto: CreateUserWithEmbeddedProfileDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    const profile = await this.profilesService.updateProfile(
      id,
      createUserWithEmbeddedProfileDto,
    );
    if (!user) {
      throw new NotFoundException('Could not found the user');
    } else {
      user.username = createUserWithEmbeddedProfileDto.username;
      user.password = createUserWithEmbeddedProfileDto.password;
      user.email = createUserWithEmbeddedProfileDto.email;
      user.profile = profile;
    }
    return this.usersRepository.save(user);
  }

  async removeOneUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });
    // // const profile = await this.profilesService.deleteProfile(id);
    // if (!user) {
    //   throw new NotFoundException('Could not found the user');
    // }
    // // this.profilesService.deleteProfile(id);

    // this.usersRepository.remove(user);

    return this.usersRepository.remove(user);
  }
}
