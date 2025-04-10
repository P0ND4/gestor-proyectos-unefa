import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './guards/auth.guard';

interface userDTO {
  login: string;
  password: string;
}

@Public()
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
  @Post('record')
  register(@Body() user: userDTO) {
    console.log(user);
    return this.authService.record(user.login, user.password);
  }
}
