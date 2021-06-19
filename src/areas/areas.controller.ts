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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { GetAreaFilterDto } from './dto/get-area-filter.dto';
import { Area } from './area.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('areas')
export class AreasController {
  constructor(private areasService: AreasService) {}

  @Get()
  getAreas(@Query() filterDto: GetAreaFilterDto): Promise<Area[]> {
    return this.areasService.getAreas(filterDto);
  }

  @Get('/:id')
  getAreaById(@Param('id', ParseIntPipe) id: number): Promise<Area> {
    return this.areasService.getAreaById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createArea(@Body() createAreaDto: CreateAreaDto): Promise<Area> {
    return this.areasService.createArea(createAreaDto);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  udpateArea(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ): Promise<Area> {
    return this.areasService.updateArea(id, name);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteArea(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.areasService.deleteArea(id);
  }
}
