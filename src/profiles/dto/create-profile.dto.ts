import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: 'Female', description: 'Male or Female' })
  gender: string;
  @ApiProperty({ example: 'photo', description: 'URL to photo' })
  photo: string;
}
