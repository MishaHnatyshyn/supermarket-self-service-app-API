import { Module } from '@nestjs/common';
import DatabaseModule from './modules/database';
import AuthModule from './modules/auth';
import CategoryModule from './modules/category';

@Module({
  imports: [DatabaseModule, AuthModule, CategoryModule],
})
export class AppModule {}
