import dbConnection from '../../db';
import { BoardEntity } from '../entities/boards';
import { IBoardModel, IBoardParams } from './board.model';

const boardRepository = dbConnection.then(connection => connection.getRepository(BoardEntity));

const getAll = async (): Promise<IBoardModel[]> => {
  const boardRepo = await boardRepository;
  return boardRepo.find();
};
const getById = async (id: string): Promise<IBoardModel | void> => {
  const boardRepo = await boardRepository;

  return boardRepo.findOne({ where: { id } });
};

const createBoard = async ({ title, columns }: IBoardParams): Promise<IBoardModel> => {
  const boardRepo = await boardRepository;

  const insertResponse = await boardRepo.insert({ title, columns });
  const boardId = insertResponse.identifiers[0];
  return boardRepo.findOneOrFail({ where: boardId });
};

const deleteById = async (id: string): Promise<void> => {
  const boardRepo = await boardRepository;
  await boardRepo.delete({ id });
};

const updateById = async ({ id, title, columns }: IBoardModel): Promise<IBoardModel> => {
  const boardRepo = await boardRepository;

  await boardRepo.findOneOrFail({ id });
  const userUpdate = await boardRepo.save({ id, title, columns });

  return userUpdate;
};

export default {
  getAll,
  getById,
  createBoard,
  deleteById,
  updateById,
};
