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

  it('post /job', async () => {
    const response = await request(app.getHttpServer()).post('/job').send({
      basicInfo: '1',
      socialStatus: '2,3', // 多个逗号隔开
      financialStatus: '223',
      repution: '11',
      dataType: '1',
      alogorithm: '3',
      intereedAddress: '0x11,0x22', // 多个逗号隔开
      deliveryFrequency: '0 * * * *', // 参考下面注释
      deliveryMethod: '1',
    });
    /*
      ┌───────── minute (0 - 59)
│ ┌─────── hour (0 - 23)
│ │ ┌───── day of the month (1 - 31)
│ │ │ ┌─── month (1 - 12)
│ │ │ │ ┌─ day of the week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
│ │ │ │ │
│ │ │ │ │
* * * * *
All times are in UTC

*/
    console.log('response', response);
    expect(response.status).toEqual(201);
    expect(response.body.result).toBeTruthy();
  });

  it('get id /job/:id', async () => {
    const response = await request(app.getHttpServer()).get('/job/' + 1);

    console.log('response', response.body);
    expect(response.status).toEqual(200);
    expect(response.body.result).toBeTruthy();

    expect(response.body.result.id).toEqual(1);
  });

  it('list /job', async () => {
    const response = await request(app.getHttpServer()).get('/job');

    console.log('response', response.body);
    expect(response.status).toEqual(200);
    expect(response.body.result.data).toBeTruthy();
  });
});
