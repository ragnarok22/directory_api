import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PhoneRepository } from './phone.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetPhonesFilterDto } from './dto/get-phones.dto';
import { Phone } from './phone.entity';
import { CreatePhoneDto } from './dto/create-phone.dto';

@Injectable()
export class PhonesService {
  private logger = new Logger('PhonesService');
  constructor(
    @InjectRepository(PhoneRepository) private phoneRepository: PhoneRepository,
  ) {}

  async createPhone(createPhoneDto: CreatePhoneDto): Promise<Phone> {
    return this.phoneRepository.createPhone(createPhoneDto);
  }

  async getPhones(filterDto: GetPhonesFilterDto): Promise<Phone[]> {
    return this.phoneRepository.getPhones(filterDto);
  }

  async getPhoneById(id: number): Promise<Phone> {
    const found = this.phoneRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Phone with id "${id}" not found`);
    }
    return found;
  }

  async updatePhone(id: number, number: string): Promise<Phone> {
    const found = await this.getPhoneById(id);
    found.number = number;
    await found.save();
    return found;
  }

  async deletePhone(id: number): Promise<void> {
    const result = await this.phoneRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Phone with id "${id}" not found`);
    }
  }
}
