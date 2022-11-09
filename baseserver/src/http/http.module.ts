import { DynamicModule, Module } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from './http.service';

@Module({
  providers: [HttpService],
})
export class HttpModule {
  static register(config?: AxiosRequestConfig): DynamicModule {
    return {
      module: HttpModule,
      providers: [{ provide: 'AXIOS', useValue: config }, HttpService],
      exports: [HttpService],
    };
  }
}
