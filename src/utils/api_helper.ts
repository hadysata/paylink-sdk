/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { PayLinkConfigs } from '../configs/configs';
import { Endpoint } from '../enums/endpoints';

export class ApiHelper {
  /**
   * It takes an endpoint and a query object, and returns a promise of the data from the API
   * @param {string} endpoint - The endpoint you want to hit.
   * @returns The data from the API call.
   */
  public static async get<T>(endpoint: Endpoint | string, headers: any): Promise<T | undefined> {
    try {
      const config = {
        method: 'get',
        url: `${PayLinkConfigs.baseUrl}${endpoint}`,
        headers: headers,
      };

      const result = await axios(config);

      return result.data as T;
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.response.data.title ?? `${error}`);
    }
  }

  public static async post<T>(endpoint: Endpoint, headers: any, data: any): Promise<T | undefined> {
    try {
      const config = {
        method: 'post',
        url: `${PayLinkConfigs.baseUrl}${endpoint}`,
        headers: headers,
        data: JSON.stringify(data),
      };

      const result = await axios(config);

      return result.data as T;
    } catch (error: any) {
      console.error(error);
      throw error?.response.data.title ?? `${error}`;
    }
  }
}
