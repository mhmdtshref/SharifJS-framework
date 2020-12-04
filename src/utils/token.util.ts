import jsonWebToken, { Secret, Algorithm } from 'jsonwebtoken';
import { EnvConstants } from '../constants';
import moment from 'moment';

export class TokenUtil {
  static generate = (payload: string | object | Buffer, expirationDateParam?: Date, secretKeyParam?: Secret) => {
    // Define settings
    const expirationDate = moment(expirationDateParam || moment().add(1, 'year'));
    const expiresIn = expirationDate.diff(moment(), 'seconds');
    const algorithm: Algorithm = EnvConstants.token.algorithm as Algorithm;
    const secretKey = secretKeyParam || (EnvConstants.token.secretKey as Secret);

    // Generate token
    const token = jsonWebToken.sign(payload, secretKey, { expiresIn, algorithm });
    return token;
  };

  static confirm = () => {};
}
