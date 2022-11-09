import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: true })
  basicInfo: string;

  @Column({ nullable: true })
  socialStatus: string;

  @Column({ nullable: true })
  financialStatus: string;

  @Column({ nullable: true })
  repution: string;

  @Column({ nullable: true })
  dataType: string;

  @Column({ nullable: true })
  alogorithm: string;

  @Column({ nullable: true })
  intereedAddress: string;

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
  @Column({ nullable: true })
  deliveryFrequency: string;

  @Column({ nullable: true })
  deliveryMethod: string;

  @CreateDateColumn({
    name: 'createdAt',
    comment: 'createdAt',
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    comment: 'updatedAt',
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Index()
  updatedAt: Date;
}
