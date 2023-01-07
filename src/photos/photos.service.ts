import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
    private usersService: UsersService,
  ) {}

  async insertPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const user = await this.usersService.findUserByEmail(createPhotoDto.email);

    const photo = new Photo();
    photo.name = createPhotoDto.name;
    photo.description = createPhotoDto.description;
    photo.url = createPhotoDto.url;
    photo.user = user;
    return await this.photosRepository.save(photo);
  }

  async getPhotos(): Promise<Photo[]> {
    return await this.photosRepository.find({ relations: ['user'] });
  }

  async updateOnePhoto(
    id: number,
    createPhotoDto: CreatePhotoDto,
  ): Promise<Photo> {
    const photo = await this.photosRepository.findOneBy({ id: id });
    const user = await this.usersService.findUserByEmail(createPhotoDto.email);
    if (!photo) {
      throw new NotFoundException('Could not found the user');
    } else {
      photo.name = createPhotoDto.name;
      photo.description = createPhotoDto.description;
      photo.url = createPhotoDto.url;
      photo.user = user;
    }

    return this.photosRepository.save(photo);
  }

  async deleteOnePhoto(id: number): Promise<Photo> {
    const photo = await this.photosRepository.findOneBy({ id: id });

    return this.photosRepository.remove(photo);
  }
}
