import { Injectable } from '@nestjs/common';
import { Area } from './area.model';
import { v4 as uuid } from 'uuid';
import { CreateAreaDto } from './dto/create-area.dto';
import { GetAreaFilterDto } from './dto/get-area-filter.dto';

@Injectable()
export class AreasService {
  private areas: Area[] = [];

  getAllAreas(): Area[] {
    return this.areas;
  }

  getAreasWithFilter(filterDto: GetAreaFilterDto): Area[] {
    const { name } = filterDto;
    let areas = this.getAllAreas();

    if (name) {
      areas = areas.filter((item) => item.name.includes(name));
    }
    return areas;
  }

  getAreaById(id: string): Area {
    return this.areas.find((item) => item.id === id);
  }

  createArea(createAreaDto: CreateAreaDto): Area {
    const { name } = createAreaDto;
    const area: Area = {
      id: uuid(),
      name,
    };
    this.areas.push(area);
    return area;
  }

  updateArea(id: string, name: string): Area {
    const area = this.getAreaById(id);
    area.name = name;
    return area;
  }

  deleteArea(id: string): void {
    this.areas = this.areas.filter((item) => item.id !== id);
  }
}
