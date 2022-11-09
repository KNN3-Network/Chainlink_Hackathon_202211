import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Job } from './entity/job.entity';
import { JobService } from './job.service';
import { dto } from './requests';

@Controller('job')
@Crud({
  model: {
    type: Job,
  },
  dto,
  query: {
    alwaysPaginate: true,
  },
})
export class JobController {
  constructor(public service: JobService) {}
}
