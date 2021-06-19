import { EntityRepository, Repository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { Phone } from './phone.entity';
import { GetPhonesFilterDto } from './dto/get-phones.dto';
import { CreatePhoneDto } from './dto/create-phone.dto';

@EntityRepository(Phone)
export class PhoneRepository extends Repository<Phone> {
  private logger = new Logger('PhoneRepository');

  async getPhones(filterDto: GetPhonesFilterDto): Promise<Phone[]> {
    const { number } = filterDto;
    const query = this.createQueryBuilder('phone');

    if (number) {
      query.andWhere('phone.number LIKE :number', { number: `%${number}%` });
    }

    try {
      const phones = query.getMany();
      return phones;
    } catch (error) {
      this.logger.error(
        `Failed to get phones. Filter: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createPhone(createPhoneDto: CreatePhoneDto): Promise<Phone> {
    const { number } = createPhoneDto;
    const phone = new Phone();
    phone.number = number;

    try {
      phone.save();
      return phone;
    } catch (error) {
      this.logger.error(
        `Failed to create phone. ${JSON.stringify(createPhoneDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
