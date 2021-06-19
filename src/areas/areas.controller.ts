import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { GetAreaFilterDto } from './dto/get-area-filter.dto';
import { Area } from './area.entity';

@Controller('areas')
export class AreasController {
  constructor(private areasService: AreasService) {}

  @Get()
  getTasks(@Query() filterDto: GetAreaFilterDto): Promise<Area[]> {
    return this.areasService.getAreas(filterDto);
  }

  @Get('/:id')
  getAreaById(@Param('id', ParseIntPipe) id: number): Promise<Area> {
    return this.areasService.getAreaById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createArea(@Body() createAreaDto: CreateAreaDto): Promise<Area> {
    return this.areasService.createArea(createAreaDto);
  }

  @Patch('/:id')
  udpateArea(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ): Promise<Area> {
    return this.areasService.updateArea(id, name);
  }

  @Delete('/:id')
  deleteArea(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.areasService.deleteArea(id);
  }
}
