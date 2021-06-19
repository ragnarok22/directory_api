import { Module } from '@nestjs/common';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaRepository } from './area.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([AreaRepository])],
  controllers: [AreasController],
  providers: [AreasService],
})
export class AreasModule {}
