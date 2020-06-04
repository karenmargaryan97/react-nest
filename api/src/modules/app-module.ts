import { Module } from '@nestjs/common';
import { EnvironmentModule } from './environment/environment-module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user-module';

@Module({
  imports: [
    DatabaseModule,
    EnvironmentModule,
    UserModule,
  ],
})
export class AppModule {}