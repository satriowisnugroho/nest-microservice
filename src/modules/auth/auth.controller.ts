import { Controller, Post, HttpStatus, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() body) {
    return { data: { token: await this.authService.login(body) } };
  }
}
