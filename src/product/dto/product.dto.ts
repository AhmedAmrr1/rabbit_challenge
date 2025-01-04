export class ProductDTO {
  id: number;
  name: string;
  category: string;
  area: string;
  createdAt: Date;
  order_count: number; // Add this line to include the order_count property
}