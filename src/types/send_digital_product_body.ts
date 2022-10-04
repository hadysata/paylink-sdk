export type SendDigitalProductBody = {
  /// The digital product data such as file location in dropbox, card charge number, username and password for an account.
  message: string;

  /// Order number of the paid order.
  orderNumber: string;
};
