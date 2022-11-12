import { Body, Controller, Get, Post, Res, Sse } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { interval, map, Observable } from 'rxjs';
import { CronService } from './cron.service';
import { Response } from 'express';
import { CreateCronDto } from './requests';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}
  @Sse('sse')
  sse() {
    return this.cronService.subscribe();
  }

  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index.html')).toString());
  }

  @Post('testEmit')
  async emit() {
    this.cronService.emit({ emitting: new Date().toISOString() });
    return 'testEmit success';
  }

  @Post()
  async create(@Body() dto: CreateCronDto) {
    this.cronService.register(dto.cron, dto.address, dto.owner);
  }
}
