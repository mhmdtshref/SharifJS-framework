const env = process.env;
export class EnvConstants {
  database = {
    url: env.DATABASE_URL || '',
  };

  host = env.HOST || '';
  port = env.PORT || 5000;
}
