import { v4 as uuid } from 'uuid';

export interface ITaskParams {
  title: string;
  order: number;
  description: string;
  boardId: string;
  userId: string | null;
  columnId: string;
}

export interface ITaskModel extends ITaskParams {
  id: string;
}

class Task {
  id: ITaskModel['id'];

  title: ITaskModel['title'];

  order: ITaskModel['order'];

  description: ITaskModel['description'];

  userId: ITaskModel['userId'];

  boardId: ITaskModel['boardId'];

  columnId: ITaskModel['columnId'];

  constructor({
    title = 'BOARD',
    order = 0,
    description = 'description',
    boardId,
    userId = null,
    columnId,
  }: ITaskParams) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: ITaskModel): ITaskModel {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };
  }
}

export default Task;
