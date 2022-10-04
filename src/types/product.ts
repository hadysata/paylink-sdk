export type Product = {
  title: string;
  description?: string;
  price: number;
  qty: number;
  specificVat?: number;
  productCost?: number;
  imageSrc?: string;
  isDigital: boolean;
};
