import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/users';
import { IUserModel, IUserParams, ISafeUser } from './user.model';
import { hashPassword } from '../authtenticate-service';
import { TaskEntity } from 'src/entities/tasks';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(TaskEntity)
    private taskRepo: Repository<TaskEntity>,
  ) {}

  async getAll(): Promise<ISafeUser[]> {
    const users = await this.userRepo.find();
    return users.map((user) => this.toResponse(user));
  }

  async getById(id: string): Promise<ISafeUser> {
    const user = await this.userRepo.findOne({ where: { id } });
    return this.toResponse(user);
  }

  async createUser({ name, login, password }: IUserParams): Promise<ISafeUser> {
    const passwordHash = hashPassword(password);
    const insertResponse = await this.userRepo.insert({
      name,
      login,
      password: passwordHash,
    });
    const userId = insertResponse.identifiers[0];
    const user = await this.userRepo.findOneOrFail({ where: userId });
    return this.toResponse(user);
  }

  async deleteById(id: string): Promise<void> {
    await this.taskRepo.update({ userId: id }, { userId: undefined });
    await this.userRepo.delete({ id });
  }

  async updateById({
    id,
    name,
    login,
    password,
  }: IUserModel): Promise<ISafeUser> {
    this.userRepo.findOneOrFail({ id });
    const passwordHash = hashPassword(password);

    const userUpdate = await this.userRepo.save({
      id,
      name,
      login,
      password: passwordHash,
    });

    return this.toResponse(userUpdate);
  }

  toResponse({ id, name, login }: IUserModel): ISafeUser {
    return { id, name, login };
  }
}
