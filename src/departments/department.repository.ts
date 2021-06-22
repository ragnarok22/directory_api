import {
  EntityRepository,
  Repository,
  getManager,
  EntityNotFoundError,
} from 'typeorm';
import { Department } from './department.entity';
import {
  Logger,
  InternalServerErrorException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { GetDeparmentFilterDto } from './dto/get-department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Area } from 'src/areas/area.entity';

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
    const { name, campus, areaId } = createDepartmentDto;
    const department = new Department();
    department.name = name;
    department.campus = campus;

    try {
      const area = await getManager()
        .createQueryBuilder(Area, 'area')
        .where('area.id = :id', { id: areaId })
        .getOneOrFail();
      department.area = area;

      await department.save();
      return department;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new BadRequestException(`Area with id "${areaId}" not found.`);
        return;
      }
      this.logger.error(
        `Failed to create department. ${JSON.stringify(createDepartmentDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
