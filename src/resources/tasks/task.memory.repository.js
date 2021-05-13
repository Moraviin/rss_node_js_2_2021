const Task = require('./task.model');

const allTasks = [new Task()];

const getAll = async () => 
   allTasks
;

const getById = async (id) => allTasks.find(task => task.id === id);

const createTask = async ({ id, title, order, description, userId, boardId, columnId }) => {
  const task = new Task({ id, title, order, description, userId, boardId, columnId })
  allTasks.push(task);
  return task;
} 

const deleteById = async(id) => {
  const boardPosition = allTasks.findIndex(task => task.id === id);

  if(boardPosition === -1) {
    throw new Error('Task not found');
  } else {
    allTasks.splice(boardPosition, 1);
  }
}

const updateById = async({ id, title, order, description, userId, boardId, columnId }) => {
  const boardPosition = allTasks.findIndex(task => task.id === id);

  if(boardPosition === -1) {
    throw new Error('Task not found');
  } else {
    const oldBoard = allTasks[boardPosition];
    const newBoard = {...oldBoard, title, order, description, userId, boardId, columnId };

    allTasks.splice(boardPosition, 1, newBoard);
    return newBoard;
  }
}

module.exports = { allTasks, getAll, getById, createTask, deleteById, updateById };
