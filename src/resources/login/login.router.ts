import { Router } from 'express';
import loginService from './login.service';

const router = Router();

router.route('/').post(async (req, res) => {
  try {
    const { login, password } = req.body;
    const jwtToken = await loginService.authenticate(login, password);
    res.json({ token: jwtToken });
  } catch {
    res.status(403).send('Forbidden');
  }
});

export default router;
