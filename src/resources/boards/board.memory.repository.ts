import Board, { IBoardModel, IBoardParams } from './board.model';

const allBoards: IBoardModel[] = [];

const getAll = async (): Promise<IBoardModel[]> => allBoards;
const getById = async (id?: string): Promise<IBoardModel | void> =>
  allBoards.find(board => board.id === id);

const createBoard = async ({
  title,
  columns,
}: IBoardParams): Promise<IBoardModel> => {
  const board = new Board({ title, columns });
  allBoards.push(board);
  return board;
};

const deleteById = async (id: string): Promise<void> => {
  const boardPosition = allBoards.findIndex(board => board.id === id);

  if (boardPosition === -1) {
    throw new Error('User not found');
  } else {
    allBoards.splice(boardPosition, 1);
  }
};

const updateById = async ({
  id,
  title,
  columns,
}: IBoardModel): Promise<IBoardModel> => {
  const boardPosition = allBoards.findIndex(board => board.id === id);

  if (boardPosition === -1) {
    throw new Error('Board not found');
  } else {
    const oldBoard = allBoards[boardPosition];
    const newBoard = { ...oldBoard, title, columns, id };

    allBoards.splice(boardPosition, 1, newBoard);
    return newBoard;
  }
};

export default {
  allBoards,
  getAll,
  getById,
  createBoard,
  deleteById,
  updateById,
};
