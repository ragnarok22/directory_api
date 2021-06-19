import { Module } from '@nestjs/common';
import { PhonesController } from './phones.controller';
import { PhonesService } from './phones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneRepository } from './phone.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PhoneRepository])],
  controllers: [PhonesController],
  providers: [PhonesService],
})
export class PhonesModule {}
