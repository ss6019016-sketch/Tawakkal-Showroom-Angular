export interface Product {
  productId: number;
  tenantId: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;

  categoryId: number;
  categoryName: string;

  stockQty: number;
  unit: string;

  status: boolean;
  createdDate: string;
}