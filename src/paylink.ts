/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
  ApiHelper,
  AuthResponse,
  Endpoint,
  PayLinkConfigs,
  CreateNewInvoiceBody,
  Invoice,
  SendDigitalProductBody,
} from './index';
import { PayLinkKeys } from './interfaces/paylink_keys';

export class PayLink {
  constructor(public token: string) {
    this.token = token;
  }

  /**  Enable merchant to login to paylink system and receive the token. This token is used by all other API requests. 
  
   * It takes the API_ID and SECRET_KEY either  provided by the user or from the .env file and uses them to authenticate with the PayLink
   * API
   * @returns A promise that resolves to a PayLink object.
   */
  static async init({
    apiId = process.env.API_ID,
    secretKey = process.env.SECRET_KEY,
    persistToken = false,
  }: PayLinkKeys): Promise<PayLink> {
    try {
      const authBody = <PayLinkKeys>{
        apiId: apiId,
        secretKey: secretKey,
        persistToken: persistToken,
      };

      const token = (await ApiHelper.post<AuthResponse>(Endpoint.auth, PayLinkConfigs.headers, authBody))?.id_token;

      return new PayLink(token!);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
 Enable the merchant to add a new invoice and receive the payment URL.

NOTE: This operation must be performed on the server-side. Then send the result payment URL to the client-side.

For test card please visit: https://developer.paylink.sa/test-cards
 */
  async createInvoice(body: CreateNewInvoiceBody): Promise<Invoice> {
    try {
      const invoice = await ApiHelper.post<Invoice>(
        Endpoint.createNewInvoice,
        PayLinkConfigs.authHeaders(this.token),
        body,
      );

      return invoice!;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /** Get invoice details by [transactionNumber] */
  async getInvoice(transactionNumber: string): Promise<Invoice> {
    try {
      const invoice = await ApiHelper.get<Invoice>(
        `${Endpoint.getInvoice}${transactionNumber}`,
        PayLinkConfigs.authHeaders(this.token),
      );

      return invoice!;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /** To use the "Sending Digital Product" feature. First, create a new invoice and set any product of the invoice as a digital product by selecting the "isDigital" attribute to "true." */
  async sendDigitalProduct(body: SendDigitalProductBody): Promise<AuthResponse> {
    try {
      const authResponse = await ApiHelper.post<AuthResponse>(
        Endpoint.sendDigitalProduct,
        PayLinkConfigs.authHeaders(this.token),
        body,
      );

      return authResponse!;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
