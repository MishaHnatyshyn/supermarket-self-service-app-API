import { Module } from '@nestjs/common';
import DatabaseModule from './modules/database';
import { AuthModule } from './modules/auth';

@Module({
  imports: [DatabaseModule, AuthModule],
})
export class AppModule {}
