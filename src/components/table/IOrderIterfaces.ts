export interface IOrder {
  id: string;
  status: string;
  responsible?: string;
  closedBy: string;
  user: {
    name: string;
  };
  discount: string;
  orderItems: IOrderItems[];
  amount: number;
}
export interface ITable {
  id: string;
  name: string;
  status: string;
  order: IOrder[];
}

export interface IOrderItems {
  id: string;
  quantity: number;
  orderId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  product: IProduct;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
