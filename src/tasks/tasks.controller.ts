import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAll(@Res() res) {
    const tasks = await this.tasksService.getAll();

    res.send(tasks);
  }

  @Get(':id')
  async getById(@Param('id') id, @Res() res) {
    const task = await this.tasksService.getById(id);

    if (task) {
      res.send(task);
    } else {
      res.status(404).send('Task not found');
    }
  }

  @Post()
  async createTask(@Param('boardId') boardId, @Body() body, @Res() res) {
    const { title, order, description, userId, columnId } = body;

    const user = await this.tasksService.createTask({
      boardId,
      title,
      order,
      description,
      userId,
      columnId,
    });

    res.status(201).send(user);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id, @Res() res) {
    await this.tasksService.deleteById(id);

    res.send('The task has been deleted!');
  }

  @Put(':id')
  async updateTask(@Param() params, @Body() body, @Res() res) {
    const { id, boardId } = params;
    const { title, order, description, userId, columnId } = body;

    const board = await this.tasksService.updateById({
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });

    res.status(200).send(board);
  }
}
