import { EntityRepository, Repository } from 'typeorm';
import { Area } from './area.entity';
import { CreateAreaDto } from './dto/create-area.dto';
import { GetAreaFilterDto } from './dto/get-area-filter.dto';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Area)
export class AreaRepository extends Repository<Area> {
  private logger = new Logger('AreaRepository');
  async getAreas(filterDto: GetAreaFilterDto): Promise<Area[]> {
    const { name } = filterDto;
    const query = this.createQueryBuilder('area');
    query.leftJoinAndSelect('area.departments', 'department');

    if (name) {
      query.andWhere('area.name LIKE :name', { name: `%${name}%` });
    }
    try {
      const areas = await query.getMany();
      return areas;
    } catch (error) {
      this.logger.error(
        `Failed to get areas. Filter: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
  async createArea(createAreaDto: CreateAreaDto): Promise<Area> {
    const { name } = createAreaDto;

    const area = new Area();
    area.name = name;
    await area.save();
    return area;
  }
}
