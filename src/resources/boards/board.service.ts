import boardsRepo from './board.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';
import { IBoardModel, IBoardParams } from './board.model';

const getAll = (): Promise<IBoardModel[]> => boardsRepo.getAll();

const getById = (id: string): Promise<IBoardModel | void> =>
  boardsRepo.getById(id);

const createBoard = ({ title, columns }: IBoardParams): Promise<IBoardModel> =>
  boardsRepo.createBoard({ title, columns });

const deleteById = (id: string): void => {
  tasksRepo.deleteTasksByBoardId(id);
  boardsRepo.deleteById(id);
};

const updateById = ({
  id,
  title,
  columns,
}: IBoardModel): Promise<IBoardModel> =>
  boardsRepo.updateById({ id, title, columns });

export default {
  getAll,
  getById,
  createBoard,
  deleteById,
  updateById,
};
