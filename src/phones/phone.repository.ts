import {
  EntityNotFoundError,
  EntityRepository,
  getManager,
  Repository,
} from 'typeorm';
import {
  Logger,
  InternalServerErrorException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Phone } from './phone.entity';
import { GetPhonesFilterDto } from './dto/get-phones.dto';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { Department } from '../departments/department.entity';

@EntityRepository(Phone)
export class PhoneRepository extends Repository<Phone> {
  private logger = new Logger('PhoneRepository');

  async getPhones(filterDto: GetPhonesFilterDto): Promise<Phone[]> {
    const { number } = filterDto;
    const query = this.createQueryBuilder('phone');
    query.leftJoinAndSelect('phone.department', 'department');

    if (number) {
      query.andWhere('phone.number LIKE :number', { number: `%${number}%` });
    }

    try {
      const phones = await query.getMany();
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
    const { number, departmentId } = createPhoneDto;
    const phone = new Phone();
    phone.number = number;

    try {
      const department = await getManager()
        .createQueryBuilder(Department, 'department')
        .where('department.id = :id', { id: departmentId })
        .getOneOrFail();
      phone.department = department;

      await phone.save();
      return phone;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new BadRequestException(
          `Department with id "${departmentId}" not found.`,
        );
      } else if (error.code === '23505') {
        throw new ConflictException(
          `Phone with number "${number}" already exists.`,
        );
        return;
      }
      this.logger.error(
        `Failed to create phone. ${JSON.stringify(createPhoneDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
