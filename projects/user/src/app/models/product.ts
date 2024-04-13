export class Product {
      _id : object
      title: String
      description: String
      quantity: number
      sold: number
      price: number
      priceAfterDiscount:number
      colors: [String]
      imageCover: String
      images: [String]
      category: object
      subcategory: object
      ratingsAverage: number
      ratingsQuantity: number

      ratings: {
        _id: string,
        user:string,
        rate:number,
        date:number

      }[]


      comments: {
        _id: string,
        user:string,
        comment:string,
        date:number
      }[]

      createdAt: Date
}
