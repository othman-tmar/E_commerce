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
    images: string[]
    category: object
    subcategory: object
    ratingsAverage: number
    ratingsQuantity: number
    ratings: object[]
    comments: object[]
    createdAt :Date
    updatedAt:Date
}
