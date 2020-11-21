const env = process.env;
export class EnvConstants {
  database = {
    url: env.DATABASE_URL || '',
  };

  host = env.HOST || '';
  port = env.PORT || 5000;

  cryptoSaltRounds: number = Number(env.CRYPTO_SALT_ROUNDS || 10);
}
