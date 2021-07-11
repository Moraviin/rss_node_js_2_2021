import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [LoginService],
  controllers: [LoginController],
  exports: [LoginService],
})
export class LoginModule {}
