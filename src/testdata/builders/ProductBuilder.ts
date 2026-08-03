import { Product } from "@model/products/Product";

export class ProductBuilder {
  private readonly product: Product = {
    id: 0,
    name: "",
    category: "",
    brand: "",
    price: 0,
    availability: "",
    thumbnail: "",
  };

  public id(value: number): ProductBuilder {
    this.product.id = value;
    return this;
  }

  public name(value: string): ProductBuilder {
    this.product.name = value;
    return this;
  }

  public category(value: string): ProductBuilder {
    this.product.category = value;
    return this;
  }

  public brand(value: string): ProductBuilder {
    this.product.brand = value;
    return this;
  }

  public price(value: number): ProductBuilder {
    this.product.price = value;
    return this;
  }

  public availability(value: string): ProductBuilder {
    this.product.availability = value;
    return this;
  }

  public build(): Product {
    return {
      ...this.product,
    };
  }
}
