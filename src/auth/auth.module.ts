import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthController } from 'src/auth/controllers';
import { AuthService } from 'src/auth/services';

@Module({
imports: [UserModule],
controllers: [AuthController],
exports: [AuthService],
providers: [AuthService],
})
export class AuthModule {}
