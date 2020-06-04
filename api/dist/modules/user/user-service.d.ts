import { AbstractService } from '../../services/abstract-service';
import { User } from './user-entity';
import { UserDTO } from './dto/user-dto';
export declare class UserService extends AbstractService<User> {
    private readonly userRepository;
    constructor(userRepository: typeof User);
    signup({ email, password }: UserDTO): Promise<{
        accessToken: any;
    }>;
    login({ email, password }: UserDTO): Promise<{
        accessToken: any;
    }>;
    getUser(id: string): Promise<{
        id: any;
        email: any;
    }>;
}
