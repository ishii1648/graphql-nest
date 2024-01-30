import { Injectable } from '@nestjs/common';
import { User } from '../graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class userService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOneById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
