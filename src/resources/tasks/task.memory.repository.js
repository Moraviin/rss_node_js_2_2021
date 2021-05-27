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

const removeUserById = async(id) => {
  const assignedTasks = allTasks.filter(task => task.userId === id);

  await Promise.allSettled(assignedTasks.map(async(task) => updateById({id: task.id, userId: null})));
  return 'Success';
}

const deleteTasksByBoardId = async(boardId) => {
  const boardTasks = allTasks.filter(task => task.boardId === boardId);

  await Promise.allSettled(boardTasks.map(async(task) => deleteById(task.id)));
  return 'Success';
  
}

module.exports = { allTasks, getAll, getById, createTask, deleteById, updateById, removeUserById, deleteTasksByBoardId };
