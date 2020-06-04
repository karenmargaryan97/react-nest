import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AbstractService } from '../../services/abstract-service';
import { USER_REPOSITORY } from '../../database/database-constants';
import { User } from './user-entity';
import { UserDTO } from './dto/user-dto';
import { Exception } from '../../exceptions/base-exception';
import { alreadyExists, notFound } from '../../exceptions/constants';
import { checkPassword, genPassword } from '../../helpers/auth';
import { signJwt } from '../../helpers/jwt';

@Injectable()
export class UserService extends AbstractService<User> {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User,) {
    super(userRepository);
  }

  async signup({ email, password }: UserDTO) {
    const existingUser = await this.get({ where: { email, password }});
    if (existingUser) {
      throw new Exception(alreadyExists('User'));
    }

    const hash = await genPassword(password);
    const user = await this.create({ email, password: hash }, { email });

    const accessToken = await signJwt({ uid: user.id });

    return { accessToken };
  }

  async login({ email, password }: UserDTO) {
    const user = await this.get({ where: { email }});
    if (!user) {
      throw new Exception(notFound('User'), HttpStatus.NOT_FOUND);
    }

    const isValidPass = await checkPassword(password, user.password);
    if (!isValidPass) {
      throw new Exception('Invalid email or password', HttpStatus.BAD_REQUEST);
    }

    const accessToken = await signJwt({ uid: user.id });

    return { accessToken };
  }

  async getUser(id: string) {
    const user = await this.get({ where: { id } });
    if (!user) {
      throw new Exception(notFound('User'), HttpStatus.NOT_FOUND);
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}