import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/entities/tasks';
import { Repository } from 'typeorm';
import { BoardEntity } from '../entities/boards';
import { IBoardModel, IBoardParams } from './board.model';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepo: Repository<BoardEntity>,
    @InjectRepository(TaskEntity)
    private taskRepo: Repository<TaskEntity>,
  ) {}

  async getAll(): Promise<IBoardModel[]> {
    return await this.boardRepo.find();
  }

  getById(id: string): Promise<IBoardModel> {
    return this.boardRepo.findOne({ where: { id } });
  }

  async createBoard({ title, columns }: IBoardParams): Promise<IBoardModel> {
    const insertResponse = await this.boardRepo.insert({ title, columns });
    const boardId = insertResponse.identifiers[0];
    return this.boardRepo.findOneOrFail({ where: boardId });
  }

  async deleteById(id: string): Promise<void> {
    await this.taskRepo.delete({ boardId: id });

    await this.boardRepo.delete({ id });
  }

  async updateById({ id, title, columns }: IBoardModel): Promise<IBoardModel> {
    await this.boardRepo.findOneOrFail({ id });
    const boardUpdate = await this.boardRepo.save({ id, title, columns });

    return boardUpdate;
  }
}
