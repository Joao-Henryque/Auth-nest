import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDTO: CreateUserDTO) {
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDTO.email,
      },
    });

    if (emailExists) {
      return new ConflictException('This email already exists');
    }

    const data = {
      ...createUserDTO,
      password: await bcrypt.hash(createUserDTO.password, 10),
    };

    await this.prisma.user.create({ data });
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return new NotFoundException('This user does not exists');
    }

    return user;
  }
}
