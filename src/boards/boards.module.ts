import { Module } from '@nestjs/common';
import { BoardEntity } from '../entities/boards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TaskEntity } from '../entities/tasks';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, TaskEntity])],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService],
})
export class BoardsModule {
  constructor(private boardsService: BoardsService) {}
}
