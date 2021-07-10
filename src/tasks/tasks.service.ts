import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/tasks';
import { Repository } from 'typeorm';
import { ITaskModel, ITaskParams } from './task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepo: Repository<TaskEntity>,
  ) {}

  async getAll(): Promise<ITaskModel[]> {
    return await this.taskRepo.find();
  }

  getById(id: string): Promise<ITaskModel> {
    return this.taskRepo.findOne({ where: { id } });
  }

  async createTask(taskParams: ITaskParams): Promise<ITaskModel> {
    const insertResponse = await this.taskRepo.insert(taskParams);
    const taskId = insertResponse.identifiers[0];
    return this.taskRepo.findOneOrFail({ where: taskId });
  }

  async deleteById(id: string): Promise<void> {
    await this.taskRepo.delete({ id });
  }

  async updateById({ id, ...taskParams }: ITaskModel): Promise<ITaskModel> {
    await this.taskRepo.findOneOrFail({ id });

    const taskUpdate = await this.taskRepo.save({ id, ...taskParams });

    return taskUpdate;
  }
}
