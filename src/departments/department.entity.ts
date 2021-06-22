import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeparmentCampus } from './department-campus.enum';
import { Area } from '../areas/area.entity';
import { Phone } from '../phones/phone.entity';

@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  campus: DeparmentCampus;

  @ManyToOne(() => Area, (area) => area.departments)
  area: Area;

  @OneToMany(() => Phone, (phone) => phone.department)
  phones: Phone[];

  getCampusName(): string {
    switch (this.campus) {
      case DeparmentCampus.CSM:
        return 'Celia Sánchez';
        break;
      case DeparmentCampus.OLM:
        return 'Oscar Lucero';
        break;
      case DeparmentCampus.JLC:
        return 'José de la Luz';
        break;
      case DeparmentCampus.MF:
        return 'Manuel Fajardo';
        break;
    }
  }
}
