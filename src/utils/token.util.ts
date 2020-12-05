import jsonWebToken, { Secret } from 'jsonwebtoken';
import { EnvConstants } from '../constants';

export class TokenUtil {
  static generate = (payload: string | object | Buffer, secretKeyParam?: Secret) => {
    // Define settings
    const secretKey = secretKeyParam || (EnvConstants.token.secretKey as Secret);
    // Generate token
    return new Promise((resolve, reject) => {
      jsonWebToken.sign(payload, secretKey, (error, token) => {
        if (error || !token) {
          reject(error || new Error('Sign token return undefined'));
        } else {
          resolve(token as string);
        }
      });
    });
  };

  static confirm = (token: string, secretKeyParam?: string) => {
    const secretKey = secretKeyParam || (EnvConstants.token.secretKey as Secret);
    return new Promise((resolve, reject) => {
      jsonWebToken.verify(token, secretKey, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      });
    });
  };
}
