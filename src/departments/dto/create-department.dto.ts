import { IsIn, IsNotEmpty } from 'class-validator';
import { DeparmentCampus } from '../department-campus.enum';

export class CreateDepartmentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsIn([
    DeparmentCampus.CSM,
    DeparmentCampus.JLC,
    DeparmentCampus.MF,
    DeparmentCampus.OLM,
  ])
  campus: DeparmentCampus;
}
