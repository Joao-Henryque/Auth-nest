import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
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

  @Get(':email')
  async findOne(@Res() response: Response, @Param('email') email: string) {
    const result = await this.usersService.getByEmail(email);

    if (result instanceof NotFoundException) {
      return response
        .status(HttpStatus.EXPECTATION_FAILED)
        .json(result.message);
    }

    return response.status(HttpStatus.OK).json(result);
  }
}
