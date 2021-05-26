import Task, { ITaskModel, ITaskParams } from './task.model';

const allTasks: ITaskModel[] = [];

const getAll = async (): Promise<ITaskModel[]> => allTasks;
const getById = async (id: string): Promise<ITaskModel | void> =>
  allTasks.find(task => task.id === id);

const createTask = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: ITaskParams): Promise<ITaskModel> => {
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  allTasks.push(task);
  return task;
};

const deleteById = async (id: string): Promise<void> => {
  const taskPosition = allTasks.findIndex(task => task.id === id);

  if (taskPosition === -1) {
    throw new Error('Task not found');
  } else {
    allTasks.splice(taskPosition, 1);
  }
};

const updateById = async ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: ITaskModel): Promise<ITaskModel> => {
  const taskPosition = allTasks.findIndex(task => task.id === id);

  if (taskPosition === -1) {
    throw new Error('Task not found');
  } else {
    const oldTask = allTasks[taskPosition];
    const newTask = {
      ...oldTask,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
      id,
    };

    allTasks.splice(taskPosition, 1, newTask);
    return newTask;
  }
};

const removeUserById = async (id: string): Promise<void> => {
  const assignedTasks = allTasks.filter(task => task.userId === id);

  await Promise.allSettled(
    assignedTasks.map(async task => updateById({ ...task, userId: null })),
  );
};

const deleteTasksByBoardId = async (boardId: string): Promise<void> => {
  const boardTasks = allTasks.filter(task => task.boardId === boardId);

  await Promise.allSettled(boardTasks.map(async task => deleteById(task.id)));
};

export default {
  allTasks,
  getAll,
  getById,
  createTask,
  deleteById,
  updateById,
  removeUserById,
  deleteTasksByBoardId,
};
