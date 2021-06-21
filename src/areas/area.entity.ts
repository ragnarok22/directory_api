import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../departments/department.entity';

@Entity()
export class Area extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Department, (department) => department.area)
  departments: Department[];

  @Column()
  name: string;
}
