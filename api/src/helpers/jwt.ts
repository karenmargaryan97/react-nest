import { EnvironmentService } from '../modules/environment/environment-service';
import { IUser } from '../guards/interfaces';
import { sign, verify } from 'jsonwebtoken';

const environmentService = new EnvironmentService();

export const signJwt = async (payload: IUser) => {
  return sign(payload, environmentService.get('JWT_SECRET'));
};

export const verifyJwt = async (token: string): Promise<IUser> => {
  try {
    const verified = await verify(token,  environmentService.get('JWT_SECRET'));

    return verified as IUser;
  } catch (e) {
    return null;
  }
};
