import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('JobController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {});

  it('post /cron', async () => {
    const response = await request(app.getHttpServer()).post('/cron').send({
      cron: '*/3 * * * *',
      address: [], // 多个逗号隔开
    });

    console.log('response', response);
    expect(response.status).toEqual(201);
  });

  it('post /cron address ', async () => {
    const response = await request(app.getHttpServer())
      .post('/cron')
      .send({
        cron: '*/3 * * * *',
        address: ['0x2e21f5d32841cf8c7da805185a041400bf15f21a'], // 多个逗号隔开
      });

    console.log('response', response);
    expect(response.status).toEqual(201);
  });
});
