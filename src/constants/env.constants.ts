const env = process.env;

export class EnvConstants {
  private static requiredConstantsList = ['DATABASE_URL', 'HOST', 'ENCRYPTION_SALT_ROUNDS'];

  static database = {
    url: env.DATABASE_URL as string,
  };

  static server = {
    host: env.HOST as string,
    port: env.PORT || 5000,
  };

  static encryption = {
    saltRounds: Number(env.ENCRYPTION_SALT_ROUNDS || 10),
  };

  static allVars = process.env;

  static checkRequiredConstants = () => {
    const notFoundList = EnvConstants.requiredConstantsList.reduce((notFoundListReducer: string[], currEnvVar) => {
      // Check if required environment variable is exists
      if (!process.env[currEnvVar]) {
        // If not found, add it to not found list (reducer)
        notFoundListReducer.push(currEnvVar);
      }
      return notFoundListReducer;
    }, []);

    // If not found list has values, then return error. Else, resolve
    if (notFoundList.length) {
      const listString = notFoundList.join(', ');
      const message = `Missing environment variables: (${listString})`;
      return Promise.reject(new Error(message));
    } else {
      return Promise.resolve();
    }
  };
}
