import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TaskEntity } from 'src/entities/tasks';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TaskEntity])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  constructor(private usersService: UsersService) {}
}
