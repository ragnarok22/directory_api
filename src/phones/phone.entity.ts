import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['number'])
export class Phone extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;
}
