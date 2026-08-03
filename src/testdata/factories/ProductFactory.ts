import { Product } from "@model/products/Product";
import { ProductBuilder } from "src/testdata/builders/ProductBuilder";

export class ProductFactory {
  /**
   * Blue Top
   */
  public static blueTop(): Product {
    return new ProductBuilder()
      .id(1)
      .name("Blue Top")
      .category("Women > Tops")
      .brand("Polo")
      .price(500)
      .build();
  }

  /**
   * Men T-Shirt
   */
  public static menTShirt(): Product {
    return new ProductBuilder()
      .id(2)
      .name("Men Tshirt")
      .category("Men > Tshirts")
      .brand("H&M")
      .price(400)
      .build();
  }
}
