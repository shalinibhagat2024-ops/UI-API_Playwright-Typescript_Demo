import { CartItem } from "@model/cart/CartItem";

export class CartItemBuilder {
  private readonly item: CartItem = {
    name: "",
    category: "",
    price: 0,
    quantity: 1,
    total: 0,
  };

  public name(value: string): CartItemBuilder {
    this.item.name = value;
    return this;
  }

  public category(value: string): CartItemBuilder {
    this.item.category = value;
    return this;
  }

  public price(value: number): CartItemBuilder {
    this.item.price = value;
    return this;
  }

  public quantity(value: number): CartItemBuilder {
    this.item.quantity = value;
    return this;
  }

  public total(value: number): CartItemBuilder {
    this.item.total = value;
    return this;
  }

  public build(): CartItem {
    return this.item;
  }
}
