import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserWithEmbeddedProfileDto } from './dto/create-user-with-embedded-profile.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'The user created successfully.',
  })
  async createUserEmbeddedProfile(
    @Body() createUserWithEmbeddedProfileDto: CreateUserWithEmbeddedProfileDto,
  ): Promise<User> {
    return await this.usersService.insertUserWithEmbeddedProfile(
      createUserWithEmbeddedProfileDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all User' })
  @ApiCreatedResponse({
    status: 200,
    description: 'OK',
  })
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user information' })
  @ApiCreatedResponse({
    status: 200,
    description: 'OK',
  })
  @ApiCreatedResponse({
    status: 404,
    description: 'User id not found.',
  })
  async updateUser(
    @Param('id') id: number,
    @Body() createUserWithEmbeddedProfileDto: CreateUserWithEmbeddedProfileDto,
  ): Promise<User> {
    return await this.usersService.updateOneUser(
      id,
      createUserWithEmbeddedProfileDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a single user' })
  @ApiCreatedResponse({
    status: 200,
    description: 'OK',
  })
  @ApiCreatedResponse({
    status: 404,
    description: 'User id not found',
  })
  async removeUser(@Param('id') id: number): Promise<User> {
    return await this.usersService.removeOneUser(id);
  }
}
