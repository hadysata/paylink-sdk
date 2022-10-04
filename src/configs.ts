import * as dotenv from 'dotenv';
import { EnvironmentType } from './enums/environment_type';

dotenv.config();

export class PayLinkConfigs {
  /**  Setting the environment variable to the value of the ENVIRONMENT environment variable, or to DEV if
the environment variable is not set. */
  static environment: EnvironmentType = EnvironmentType[process.env.ENVIRONMENT ?? 'TEST'] ?? EnvironmentType.TEST;

  /** Checking if the environment is production. */
  static isProd = this.environment === EnvironmentType.PROD;

  /** PayLink Host. If [isProd] is true, then the host
variable will be set to restapi.paylink.sa, otherwise it will be set to restpilot.paylink.sa. */
  static host = this.isProd ? 'restapi.paylink.sa' : 'restpilot.paylink.sa';

  /** Using the host variable to create the baseUrl variable. */
  static baseUrl = `https://${this.host}/api`;

  /** Setting the headers that will be sent with every request. */
  static headers = {
    accept: '*/*',
    'content-type': 'application/json',
  };

  /**
   * It takes a token and returns an object with the same headers as the static headers property, but
   * with an additional Authorization header
   * @param {string} token - The token that was returned from the login request.
   * @returns An object with the key Authorization and the value Bearer
   */
  static authHeaders(token: string) {
    const authHeaders = this.headers;
    authHeaders['Authorization'] = `Bearer ${token}`;

    return authHeaders;
  }
}
