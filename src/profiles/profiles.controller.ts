import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('profiles')
@ApiTags('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all profiles' })
  @ApiCreatedResponse({
    status: 200,
    description: 'OK',
  })
  @UseGuards(JwtAuthGuard)
  async getProfiles(): Promise<Profile[]> {
    return await this.profilesService.getProfiles();
  }
}
