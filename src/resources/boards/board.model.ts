import { v4 as uuid } from 'uuid';

export interface IColumnModel {
  id: string;
  title: string;
  order: string;
}

export interface IBoardParams {
  title: string;
  columns: IColumnModel[];
}

export interface IBoardModel extends IBoardParams {
  id: string;
}

class Board {
  id: IBoardModel['id'];

  title: IBoardModel['title'];

  columns: IBoardModel['columns'];

  constructor({ title = 'BOARD', columns = [] }: IBoardParams) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoardModel): IBoardModel {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
