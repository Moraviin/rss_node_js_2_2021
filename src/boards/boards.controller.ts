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
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  async getAll(@Res() res) {
    const boards = await this.boardsService.getAll();
    res.send(boards);
  }

  @Get(':id')
  async getById(@Param('id') id, @Res() res) {
    const board = await this.boardsService.getById(id);

    if (board) {
      res.send(board);
    } else {
      res.status(404).send('Board not found');
    }
  }

  @Post()
  async createBoard(@Body() body, @Res() res) {
    const { title, columns } = body;

    const user = await this.boardsService.createBoard({ title, columns });

    res.status(201).send(user);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id, @Res() res) {
    await this.boardsService.deleteById(id);

    await res.send('The board has been deleted!');
  }

  @Put(':id')
  async updateBoard(@Param('id') id, @Body() body, @Res() res) {
    const { title, columns } = body;

    const board = await this.boardsService.updateById({ id, title, columns });

    res.status(200).send(board);
  }
}
