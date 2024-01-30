import { ParseIntPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../graphql';
import { userService } from './user.service';

@Resolver('User')
export class userResolver {
  constructor(private readonly userService: userService) {}

  @Query('users')
  async getuser() {
    return this.userService.findAll();
  }

  @Query('user')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return this.userService.findOneById(id);
  }
}
