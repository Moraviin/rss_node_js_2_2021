import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../common/config';
import loginRepo from './login.memory.reposytory';

const authenticate = async (login: string, password: string): Promise<string> => {
  const user = await loginRepo.loginUser(login, password);
  const jwtToken = jwt.sign(
    {
      id: user.id,
      login: user.login,
    },
    JWT_SECRET_KEY,
    { expiresIn: '1h' },
  );
  return jwtToken;
};

export default { authenticate };
