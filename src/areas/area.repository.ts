import { EntityRepository, Repository } from 'typeorm';
import { Area } from './area.entity';
import { CreateAreaDto } from './dto/create-area.dto';
import { GetAreaFilterDto } from './dto/get-area-filter.dto';

@EntityRepository(Area)
export class AreaRepository extends Repository<Area> {
  async getAreas(filterDto: GetAreaFilterDto): Promise<Area[]> {
    const { name } = filterDto;
    const query = this.createQueryBuilder('area');

    if (name) {
      query.andWhere('area.name LIKE :name', { name: `%${name}%` });
    }

    const areas = query.getMany();
    return areas;
  }
  async createArea(createAreaDto: CreateAreaDto): Promise<Area> {
    const { name } = createAreaDto;

    const area = new Area();
    area.name = name;
    await area.save();
    return area;
  }
}
