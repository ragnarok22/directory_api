import { IsNotEmpty } from 'class-validator';
import { DeparmentCampus } from '../department-campus.enum';

export class CreateDepartmentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  campus: DeparmentCampus;
}
