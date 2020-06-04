import * as bcrypt from 'bcryptjs';

export const genSalt = async (saltRounds: number) => {
  return bcrypt.genSalt(saltRounds);
};

export const hashPassword = async (password: string, salt: number): Promise<string> => {
  return bcrypt.hash(password, salt);
};

export const genPassword = async (password: string): Promise<string> => {
  // TODO from env
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  return hashPassword(password, salt);
};

export const checkPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
