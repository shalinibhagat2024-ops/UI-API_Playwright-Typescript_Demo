import { Product } from "@model/products/Product";
import { DataGenerator } from "@utils/data/DataGenerator";

export class ProductData {
  public static valid(): Product {
    return {
      id: DataGenerator.randomNumber(100, 200),
      name: DataGenerator.productName(),
      category: DataGenerator.category(),
      brand: "Apple",
      price: DataGenerator.randomNumber(100, 1000),

      quantity: 10,

      availability: "yes",

      thumbnail: "https://dummyjson.com/image.png",
    };
  }
}
