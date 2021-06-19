import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { Area } from './area.model';
import { CreateAreaDto } from './dto/create-area.dto';
import { GetAreaFilterDto } from './dto/get-area-filter.dto';

@Controller('areas')
export class AreasController {
  constructor(private areasService: AreasService) {}

  @Get()
  getTasks(@Query() filterDto: GetAreaFilterDto): Area[] {
    if (Object.keys(filterDto).length) {
      return this.areasService.getAreasWithFilter(filterDto);
    }
    return this.areasService.getAllAreas();
  }

  @Get('/:id')
  getAreaById(@Param('id') id: string): Area {
    return this.areasService.getAreaById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createArea(@Body() createAreaDto: CreateAreaDto): Area {
    return this.areasService.createArea(createAreaDto);
  }

  @Patch('/:id')
  udpateArea(@Param('id') id: string, @Body('name') name: string): Area {
    return this.areasService.updateArea(id, name);
  }

  @Delete('/:id')
  deleteArea(@Param('id') id: string): void {
    return this.areasService.deleteArea(id);
  }
}
