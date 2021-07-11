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
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(@Res() res) {
    const users: UpdateUsersDto[] = await this.usersService.getAll();
    res.send(users);
  }

  @Get(':id')
  async getById(@Param('id') id, @Res() res) {
    const user: UpdateUsersDto = await this.usersService.getById(id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  @Post()
  async createUser(@Body() body: CreateUserDto, @Res() res) {
    const { name, login, password } = body;

    const user = await this.usersService.createUser({ name, login, password });

    res.status(201).send(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id, @Res() res) {
    await this.usersService.deleteById(id);

    res.send('The user has been deleted!');
  }

  @Put(':id')
  async updateUser(@Param('id') id, @Body() body: UpdateUsersDto, @Res() res) {
    const { name, login, password } = body;

    const user = await this.usersService.updateById({
      id,
      name,
      login,
      password,
    });

    res.status(200).send(user);
  }
}
