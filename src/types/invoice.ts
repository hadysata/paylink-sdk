import { OrderStatus } from '../enums/order_status';
import { CreateNewInvoiceBody } from './create_new_invoice_body';
import { PaymentErrors } from './payments_errors';

export type Invoice = {
  /// The amount of the invoice in Paylink system
  amount: number;

  /// The url from Paylink to check the payment status of the order. It require bearer token authentication.
  checkUrl: string;

  /// If order have digital product, this flag will be set to true
  digitalOrder: boolean;

  /// This data contains information about the invoice in Paylink system.
  gatewayOrderRequest: CreateNewInvoiceBody;

  /// The status of the invoice in Paylink system.
  orderStatus: OrderStatus;

  /// The list of errors occurred during payment process
  paymentErrors: PaymentErrors;

  /// If this endpoint operation is success, value will be true
  success: boolean;

  /// Unique transaction number for the created invoice in Paylink system
  transactionNo: string;

  /// The payment url from Paylink. This url is used to open the payment form in the Paylink system.
  url: string;
};
