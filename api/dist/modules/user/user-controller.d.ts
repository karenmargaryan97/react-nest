import { UserService } from './user-service';
import { UserDTO } from './dto/user-dto';
import { IUser } from '../../guards/interfaces';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(userDTO: UserDTO): Promise<{
        accessToken: any;
    }>;
    login(userDTO: UserDTO): Promise<{
        accessToken: any;
    }>;
    getUser({ uid }: IUser): Promise<{
        id: any;
        email: any;
    }>;
}
