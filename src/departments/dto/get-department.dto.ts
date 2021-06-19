import { DeparmentCampus } from '../department-campus.enum';
import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export class GetDeparmentFilterDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn([
    DeparmentCampus.CSM,
    DeparmentCampus.JLC,
    DeparmentCampus.MF,
    DeparmentCampus.OLM,
  ])
  campus: DeparmentCampus;
}
