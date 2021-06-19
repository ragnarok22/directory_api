import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasModule } from './areas/areas.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AreasModule,
    AuthModule,
    DepartmentsModule,
  ],
})
export class AppModule {}
