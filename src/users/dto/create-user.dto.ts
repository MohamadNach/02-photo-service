import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Mohes', description: 'Uniqe username' })
  username: string;
  @ApiProperty({ example: '12%548(Msajhn', description: 'Uniqe password' })
  password: string;
  @ApiProperty({ example: 'Mohes@lab.fi', description: 'Email address' })
  email: string;
}
