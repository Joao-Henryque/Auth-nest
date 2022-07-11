import {
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async store(@Res() response: Response, @Body() data: CreateUserDTO) {
    const result = await this.usersService.createUser(data);

    if (result instanceof ConflictException) {
      return response.status(HttpStatus.CONFLICT).json(result.message);
    }

    return response.status(HttpStatus.CREATED).end();
  }
}
