import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { JobModule } from '../job/job.module';
import { CronModule } from './cron.module';
import { CronService } from './cron.service';

describe('CronService', () => {
  let service: CronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              type: configService.get('DB_TYPE'),
              host: configService.get('DB_HOST'),
              port: configService.get('DB_PORT'),
              username: configService.get('DB_USER'),
              password: configService.get('DB_PWD'),
              database: configService.get('DB_DB'),
              logging: configService.get('DB_LOGGING') === 'true',
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              synchronize: configService.get('DB_SYNC') === 'true',
            } as TypeOrmModuleAsyncOptions;
          },
        }),
        CronModule,
      ],
      providers: [CronService],
    }).compile();

    service = module.get<CronService>(CronService);
  });

  jest.setTimeout(500000000);

  it('register', async () => {
    await service.register('*/3 * * * *', []);
    expect('1').toBeDefined();
  });
});
