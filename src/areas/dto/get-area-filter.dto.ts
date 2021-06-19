import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetAreaFilterDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;
}
