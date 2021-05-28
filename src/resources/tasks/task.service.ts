import tasksRepo from './task.memory.repository';
import { ITaskModel, ITaskParams } from './task.model';

const getAll = (): Promise<ITaskModel[]> => tasksRepo.getAll();

const getById = (id: string): Promise<ITaskModel | void> => tasksRepo.getById(id);

const createTask = ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: ITaskParams): Promise<ITaskModel> =>
  tasksRepo.createTask({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

const deleteById = (id: string): Promise<void> => tasksRepo.deleteById(id);

const updateById = ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: ITaskModel): Promise<ITaskModel> =>
  tasksRepo.updateById({
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

export default {
  getAll,
  getById,
  createTask,
  deleteById,
  updateById,
};
