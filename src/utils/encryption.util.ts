import bcrypt from 'bcrypt';
import { EnvConstants } from '../constants';

const { saltRounds } = EnvConstants.encryption;
export class EncryptionUtil {
  generateHash = (plain: string) => {
    return bcrypt.hash(plain, saltRounds);
  };

  compareHash = (plain: string, hash: string) => {
    return bcrypt.compare(plain, hash);
  };
}
