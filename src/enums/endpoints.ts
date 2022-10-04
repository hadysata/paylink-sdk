export enum Endpoint {
    /** Enable merchant to login to paylink system and receive the token. This token is used by all other API requests. */
    auth = '/auth',
  
    /** Enable the merchant to add a new invoice and receive the payment URL. */
    createNewInvoice = '/addInvoice',
  
    /** Enable merchant to get invoice details.
    
    Followed by transaction id
    */
    getInvoice = '/getInvoice/',
  
    /** Sending digital product information */
    sendDigitalProduct = '/sendDigitalProduct',
  }