import { Photo } from 'src/photos/entities/photo.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from 'src/profiles/entities/profile.entity';
import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { IsOptional } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @IsOptional()
  @ApiProperty()
  username: string;

  @Column()
  @IsOptional()
  @ApiProperty()
  password: string;

  @Column()
  @IsOptional()
  @ApiProperty()
  email: string;

  // OneToOne relation (one profile for one user)
  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile?: Profile; // ? marke will make the profile input is optional

  @OneToMany(() => Photo, (photo) => photo.user)
  photos?: Photo[];
}
