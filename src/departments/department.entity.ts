import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DeparmentCampus } from './department-campus.enum';

@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  campus: DeparmentCampus;

  @Column()
  areaId: number;
}
