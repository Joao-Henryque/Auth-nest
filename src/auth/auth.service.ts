import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly UsersService: UsersService) {}

  async validateUser(email: string, password: string) {
    return null;
  }
}
