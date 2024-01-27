import { Injectable } from '@nestjs/common';
import { Cat } from '../graphql';

@Injectable()
export class CatsService {
  private readonly cats: Array<Cat> = [{ id: 1, name: 'Cat', age: 5 }];

  findAll(): Cat[] {
    return this.cats;
  }

  findOneById(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }
}
