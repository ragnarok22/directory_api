import { IsNotEmpty } from 'class-validator';

export class CreatePhoneDto {
  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  departmentId: number;
}
