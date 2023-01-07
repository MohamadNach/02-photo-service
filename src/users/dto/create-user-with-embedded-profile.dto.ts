import { ApiProperty } from '@nestjs/swagger';

export class CreateUserWithEmbeddedProfileDto {
  @ApiProperty({ example: 'Mohes', description: 'Uniqe username' })
  username: string;

  @ApiProperty({ example: '12%548(Msajhn', description: 'Uniqe password' })
  password: string;

  @ApiProperty({ example: 'Mohes@lab.fi', description: 'Email address' })
  email: string;

  @ApiProperty({
    example: '{gender: male , photo: url-photo}',
    description: 'User gender and photo',
  })
  profile: {
    gender: string;
    photo: string;
  };
}
