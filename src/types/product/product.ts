export type Product = {
  /** Title of the product */
  title: string;

  /** Description of the product */
  description?: string;

  /** Price of the product
   *
   * NOTE: Minimum price is 5.00 SAR */
  price: number;

  /** Quantity of the product */
  qty: number;

  /** If the VAT value differs from the standard VAT in Saudi Arabia, we put the specific VAT here. For example, zero VAT or 5 for 5% VAT. The value here is always decimal. The system will always handle it as a percentage value. */
  specificVat?: number;

  /** Optional. Set product cost which may be used by merchant to calculate the net profit of the product. */
  productCost?: number;

  /** URL of the product image. */
  imageSrc?: string;

  /** If the product is a digital product */
  isDigital: boolean;
};
