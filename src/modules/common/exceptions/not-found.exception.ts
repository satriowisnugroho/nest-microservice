import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

export class NotFoundException extends HttpException {
  constructor() {
    super('Path not found', HttpStatus.NOT_FOUND);
  }
}