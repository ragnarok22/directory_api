import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { GetDeparmentFilterDto } from './dto/get-department.dto';
import { Department } from './department.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
export class DepartmentsController {
  private logger = new Logger('DepartmentsController');

  constructor(private departmentsService: DepartmentsService) {}

  @Get()
  getDepartments(
    @Query() filterDto: GetDeparmentFilterDto,
  ): Promise<Department[]> {
    return this.departmentsService.getDepartments(filterDto);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentsService.createDepartment(createDepartmentDto);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  udpateDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ): Promise<Department> {
    return this.departmentsService.updateDepartment(id, name);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteDepartment(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.departmentsService.deleteDepartment(id);
  }
}
