import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserPreferenceEntity, UserTokenEntity } from 'src/user/entites';

@Module({
imports: [TypeOrmModule.forFeature([UserEntity, UserPreferenceEntity, UserTokenEntity])],
// controllers: [],
// exports: [],
// providers: [],
})
export class UserModule {}
