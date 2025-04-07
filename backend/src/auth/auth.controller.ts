import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface userDTO {
  login: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() user: userDTO) {
    return this.authService.login(user.login, user.password);
  }

  @Get('users')
  getUsers() {
    return this.authService.getUsers();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() user: userDTO) {
    console.log(user);
    return this.authService.signup(user.login, user.password);
  }
}
