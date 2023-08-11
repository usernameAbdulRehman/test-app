import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserPreferenceEntity, UserTokenEntity } from 'src/user/entites';
import { UserService, UserTokenService } from 'src/user/services';

@Module({
imports: [TypeOrmModule.forFeature([UserEntity, UserPreferenceEntity, UserTokenEntity])],
exports: [UserService, UserTokenService],
providers: [UserService, UserTokenService],
})
export class UserModule {}
