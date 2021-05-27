const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks.map(Task.toResponse));
});

router.route('/').post(async (req, res) => {
  try {
    const {  boardId } = req.params;
    const { id, title, order, description, userId, columnId } = req.body;

    const task = await tasksService.createTask({ id, title, order, description, userId, boardId, columnId });
    res.status(201).send(Task.toResponse(task));
  } catch {
    res.status(400).send({error: 'Bad request'})
  }

});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const task = await tasksService.getById(id);

  if(task){
    res.json(Task.toResponse(task));
  } else {
    res.status(404).send('Task not found')
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
  const { id } = req.params;
  await tasksService.deleteById(id);

    res.status(204).send('The task has been deleted');
  } catch(e) {
    res.status(404).send('Task not found');
  }
});


router.route('/:id').put(async (req, res) => {
  try {
    const { id, boardId } = req.params;
    
    const { title, order, description, userId, columnId } = req.body;

    const task = await tasksService.updateById({ id, title, order, description, userId, boardId, columnId });

    res.status(200).send(Task.toResponse(task));
  } catch(e) {
    res.status(404).send('Task not found');
  }
});

module.exports = router;
