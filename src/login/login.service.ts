import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/users';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async authenticate(login, password) {
    const user = await this.userRepo.findOneOrFail({ login });

    // const isPasswordIncorrect = !bcrypt.compareSync(password, user.password);
    // if (isPasswordIncorrect) throw new Error();

    const jwtToken = jwt.sign(
      {
        id: user.id,
        login: user.login,
      },
      JWT_SECRET_KEY,
      { expiresIn: '1h' },
    );

    return jwtToken;
  }
}
