import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { DepartmentRepository } from './department.repository';
import { GetDeparmentFilterDto } from './dto/get-department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentRepository)
    private departmentRepository: DepartmentRepository,
  ) {}

  async getDepartments(
    filterDto: GetDeparmentFilterDto,
  ): Promise<Department[]> {
    return this.departmentRepository.getDepartments(filterDto);
  }

  async getDepartmentById(id: number): Promise<Department> {
    const found = await this.departmentRepository.findOne(id, {
      relations: ['phones'],
    });

    if (!found) {
      throw new NotFoundException(`Department with id "${id}" not found`);
    }
    return found;
  }

  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentRepository.createDepartment(createDepartmentDto);
  }

  async updateDepartment(id: number, name: string): Promise<Department> {
    const department = await this.getDepartmentById(id);
    department.name = name;
    await department.save();
    return department;
  }

  async deleteDepartment(id: number): Promise<void> {
    const result = await this.departmentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Area with id "${id}" not found`);
    }
  }
}
