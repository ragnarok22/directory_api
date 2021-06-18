import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';

@Module({
  controllers: [AreaController]
})
export class AreaModule {}
