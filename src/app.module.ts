import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { OrmConfig } from './orm-config';
import { UsersController } from './users/users.controller';
import { ProfilesController } from './profiles/profiles.controller';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PhotosModule } from './photos/photos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig.config),
    UsersModule,
    ProfilesModule,
    PhotosModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController, ProfilesController],
  providers: [AppService],
})
export class AppModule {}
