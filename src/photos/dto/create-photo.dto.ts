import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({ example: 'Image', description: 'Uniqe photo name' })
  name: string;
  @ApiProperty({ example: 'nice picture', description: 'description of photo' })
  description: string;
  @ApiProperty({ example: 'http:/picture/', description: 'photo URL' })
  url: string;
  @ApiProperty({ example: 'Mohes@lab.fi', description: 'Email address' })
  email: string;
}
