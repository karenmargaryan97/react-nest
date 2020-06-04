import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user-service';
import { UserDTO } from './dto/user-dto';
import { Auth } from '../../decorators/auth-decorator';
import { User } from '../../decorators/auth-user-decorator';
import { IUser } from '../../guards/interfaces';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() userDTO: UserDTO) {
    return await this.userService.signup(userDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userDTO: UserDTO) {
    return await this.userService.login(userDTO);
  }

  @Auth()
  @Get('me')
  async getUser(@User() { uid }: IUser) {
    return await this.userService.getUser(uid);
  }
}
