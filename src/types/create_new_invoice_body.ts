import { Product } from './product';

export type CreateNewInvoiceBody = {
  /// Amount of the invoice. (mandatory)
  amount: number;
  /// Call back URL that will be called by the Paylink to the merchant system. This callback URL will receive two parameters: orderNumber, and transactionNo. (mandatory)
  callBackUrl: string;

  cancelUrl?: string;

  /// The client mobile (mandatory)
  clientMobile: string;
  /// The client name (mandatory)
  clientName: string;
  /// The client email
  clientEmail?: string;
  /// The invoice note
  note?: string;
  /// Unique order number in the merchant system (mandatory)
  orderNumber: string;

  /// List of products of the invoice. This list is optional.
  products?: Product[];
};
