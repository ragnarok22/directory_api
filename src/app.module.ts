import { Module } from '@nestjs/common';
import { AreasModule } from './areas/areas.module';

@Module({
  imports: [AreasModule],
})
export class AppModule {}
