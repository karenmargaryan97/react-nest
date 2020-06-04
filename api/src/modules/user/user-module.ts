import { Module } from '@nestjs/common';
import { UserController } from './user-controller';
import { UserService } from './user-service';
import { USER_REPOSITORY } from '../../database/database-constants';
import { User } from './user-entity';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useValue: User,
    },
  ],
})
export class UserModule {}
