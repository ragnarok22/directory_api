import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateAreaDto } from './dto/create-area.dto';
import { GetAreaFilterDto } from './dto/get-area-filter.dto';
import { AreaRepository } from './area.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from './area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(AreaRepository) private areaRepository: AreaRepository,
  ) {}

  getAreas(filterDto: GetAreaFilterDto): Promise<Area[]> {
    return this.areaRepository.getAreas(filterDto);
  }

  // getAllAreas(): Area[] {
  //   return this.areas;
  // }

  // getAreasWithFilter(filterDto: GetAreaFilterDto): Area[] {
  //   const { name } = filterDto;
  //   let areas = this.getAllAreas();

  //   if (name) {
  //     areas = areas.filter((item) => item.name.includes(name));
  //   }
  //   return areas;
  // }

  async getAreaById(id: number): Promise<Area> {
    const found = await this.areaRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Area with id "${id}" not found`);
    }
    return found;
  }

  async createArea(createAreaDto: CreateAreaDto): Promise<Area> {
    return this.areaRepository.createArea(createAreaDto);
  }

  async updateArea(id: number, name: string): Promise<Area> {
    const area = await this.getAreaById(id);
    area.name = name;
    await area.save();
    return area;
  }

  async deleteArea(id: number): Promise<void> {
    const result = await this.areaRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Area with id "${id}" not found`);
    }
  }

  // deleteArea(id: string): void {
  //   this.areas = this.areas.filter((item) => item.id !== id);
  // }
}
