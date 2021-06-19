import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PhonesService } from './phones.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { Phone } from './phone.entity';
import { GetPhonesFilterDto } from './dto/get-phones.dto';

@Controller('phones')
export class PhonesController {
  private logger = new Logger('PhonesController');
  constructor(private phonesService: PhonesService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createPhone(@Body() createPhoneDto: CreatePhoneDto): Promise<Phone> {
    return this.phonesService.createPhone(createPhoneDto);
  }

  @Get()
  getPhones(@Query() filterDto: GetPhonesFilterDto): Promise<Phone[]> {
    return this.phonesService.getPhones(filterDto);
  }

  @Patch('/:id')
  updatePhone(
    @Param('id', ParseIntPipe) id: number,
    @Body('number') number: string,
  ): Promise<Phone> {
    return this.phonesService.updatePhone(id, number);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deletePhone(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.phonesService.deletePhone(id);
  }
}
