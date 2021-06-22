import { EntityRepository, Repository } from 'typeorm';
import { Department } from './department.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { GetDeparmentFilterDto } from './dto/get-department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';

@EntityRepository(Department)
export class DepartmentRepository extends Repository<Department> {
  private logger = new Logger('DepartmentRepository');

  async getDepartments(
    filterDto: GetDeparmentFilterDto,
  ): Promise<Department[]> {
    const { name, campus } = filterDto;
    const query = this.createQueryBuilder('department');
    query.leftJoinAndSelect('department.phones', 'phone');
    query.leftJoinAndSelect('department.area', 'area');

    if (name) {
      query.andWhere('department.name LIKE :name', { name: `%${name}%` });
    }

    if (campus) {
      query.andWhere('department.campus = :campus', { campus });
    }

    try {
      const departments = await query.getMany();
      return departments;
    } catch (error) {
      this.logger.error(
        `Failed to get departments. Filter: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    const { name, campus } = createDepartmentDto;
    const department = new Department();
    department.name = name;
    department.campus = campus;

    try {
      await department.save();
      return department;
    } catch (error) {
      this.logger.error(
        `Failed to create department. ${JSON.stringify(createDepartmentDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
