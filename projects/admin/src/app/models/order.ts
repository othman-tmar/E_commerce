export class Order {
     _id :object;

    orderItems: {
      product :string,
      quantity: number,
      price :number
    }[];
    
    productsNumber: number
    useruid: string
    totalOrderPrice: number
    discount: number
    tax : number
    finalPrice: number
    createdAt: Date
   
  }

  

