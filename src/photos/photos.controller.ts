import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotosService } from './photos.service';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('photos')
@ApiTags('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new photo' })
  @ApiCreatedResponse({
    description: 'The photo added successfully.',
  })
  async createPhotoUsingEmail(
    @Body() createPhotoDto: CreatePhotoDto,
  ): Promise<Photo> {
    return await this.photosService.insertPhoto(createPhotoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all photos' })
  @ApiCreatedResponse({
    status: 200,
    description: 'OK',
  })
  async getPhotos(): Promise<Photo[]> {
    return await this.photosService.getPhotos();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update photo information' })
  @ApiCreatedResponse({
    status: 200,
    description: 'OK',
  })
  @ApiCreatedResponse({
    status: 404,
    description: 'photo not found.',
  })
  async updatePhoto(
    @Param('id') id: number,
    @Body() createPhotoDto: CreatePhotoDto,
  ): Promise<Photo> {
    return await this.photosService.updateOnePhoto(id, createPhotoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete photo' })
  @ApiCreatedResponse({
    status: 200,
    description: 'OK',
  })
  @ApiCreatedResponse({
    status: 404,
    description: 'photo not found.',
  })
  async deletePhoto(@Param('id') id: number): Promise<Photo> {
    return await this.photosService.deleteOnePhoto(id);
  }
}
