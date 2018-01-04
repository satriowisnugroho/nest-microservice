import * as jwt from 'jsonwebtoken';
import { Component, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { LoginInterface } from './interfaces/index';

@Component()
export class AuthService {
  async validateUser(signedUser): Promise<boolean> {
    return !!signedUser.session_id;
  }

  async login(login: LoginInterface): Promise<{ message: string, token: string }> {
    const secretOrKey = process.env.JWT_KEY;

    if (login.username !== 'wisnugro' || login.password !== '12345678') {
      throw new HttpException('Username atau Password Anda salah', HttpStatus.BAD_REQUEST);
    }

    const user = { username: login.username };

    return jwt.sign(user, secretOrKey);
  }
}
