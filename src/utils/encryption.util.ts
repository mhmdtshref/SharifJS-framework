import bcrypt from 'bcrypt';
import { EnvConstants } from '../constants';

const { cryptoSaltRounds } = new EnvConstants();
export class EncryptionUtil {
  generateHash = (plain: string) => {
    return bcrypt.hash(plain, cryptoSaltRounds);
  };

  compareHash = (plain: string, hash: string) => {
    return bcrypt.compare(plain, hash);
  };
}
