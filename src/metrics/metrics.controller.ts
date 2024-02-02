import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('metrics')
export class MetricsController {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  @Get()
  async get(): Promise<string> {
    return this.prisma.$metrics.prometheus();
  }
}
