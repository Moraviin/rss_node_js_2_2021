import dbConnection from '../../db';
import { TaskEntity } from '../entities/tasks';
import { ITaskModel, ITaskParams } from './task.model';

const taskRepository = dbConnection.then(connection => connection.getRepository(TaskEntity));

const getAll = async (): Promise<ITaskModel[]> => {
  const taskRepo = await taskRepository;
  return taskRepo.find();
};

const getById = async (id: string): Promise<ITaskModel | void> => {
  const taskRepo = await taskRepository;
  return taskRepo.findOne({ where: { id } });
};

const createTask = async (taskParams: ITaskParams): Promise<ITaskModel> => {
  const taskRepo = await taskRepository;
  const insertResponse = await taskRepo.insert(taskParams);
  const taskId = insertResponse.identifiers[0];
  return taskRepo.findOneOrFail({ where: taskId });
};

const deleteById = async (id: string): Promise<void> => {
  const taskRepo = await taskRepository;
  await taskRepo.delete({ id });
};

const updateById = async ({ id, ...taskParams }: ITaskModel): Promise<ITaskModel> => {
  const taskRepo = await taskRepository;

  await taskRepo.findOneOrFail({ id });

  const taskUpdate = await taskRepo.save({ id, ...taskParams });

  return taskUpdate;
};

const removeUserById = async (id: string): Promise<void> => {
  const taskRepo = await taskRepository;

  await taskRepo.update({ userId: id }, { userId: undefined });
};

const deleteTasksByBoardId = async (boardId: string): Promise<void> => {
  const taskRepo = await taskRepository;

  await taskRepo.delete({ boardId });
};

export default {
  getAll,
  getById,
  createTask,
  deleteById,
  updateById,
  removeUserById,
  deleteTasksByBoardId,
};
