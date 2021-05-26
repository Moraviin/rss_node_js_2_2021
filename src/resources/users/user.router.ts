import { Router } from 'express';
import User from './user.model';
import usersService from './user.service';

const router = Router();

router.route('/').get(async (_, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  try {
    const { name, login, password } = req.body;

    const user = await usersService.createUser({ name, login, password });

    res.status(201).send(User.toResponse(user));
  } catch {
    res.status(400).send({ error: 'Bad request' });
  }
});

router.route('/:id').get(async (req, res) => {
  const id = `${req.params['id']}`;

  const user = await usersService.getById(id);

  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.status(404).send('User not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const id = `${req.params['id']}`;

    await usersService.deleteById(id);

    res.status(204).send('The user has been deleted!');
  } catch (e) {
    res.status(404).send('User not found');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const id = `${req.params['id']}`;

    const { name, login, password } = req.body;

    const user = await usersService.updateById({
      id,
      name,
      login,
      password,
    });

    res.status(200).send(User.toResponse(user));
  } catch (e) {
    res.status(404).send('User not found');
  }
});

export default router;
