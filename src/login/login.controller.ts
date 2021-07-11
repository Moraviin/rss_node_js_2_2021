import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async authenticate(@Body() body, @Res() res) {
    const { login, password } = body;
    const jwtToken = await this.loginService.authenticate(login, password);

    res.status(200).send({ token: jwtToken });
  }
}
