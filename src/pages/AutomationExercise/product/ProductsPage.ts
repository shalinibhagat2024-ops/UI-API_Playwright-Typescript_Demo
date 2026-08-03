import { EnvironmentManager } from "@core/config/EnvironmentManager";
import { BrandComponent } from "@core/helpers/components/automationexercise/BrandComponent";
import { CartModalComponent } from "@core/helpers/components/automationexercise/CartModalComponent";
import { CategoryComponent } from "@core/helpers/components/automationexercise/CategoryComponent";
import { ProductGridComponent } from "@core/helpers/components/automationexercise/ProductGridComponent";
import { SearchComponent } from "@core/helpers/components/automationexercise/SearchComponent";
import { Logger } from "@core/logger/Logger";
import { Product } from "@model/products/Product";
import { Locator, Page } from "@playwright/test";

import { ApplicationRoutes } from "../../../core/config/ApplicationRoutes";
import { BasePage } from "../basePage/BasePage";

export class ProductsPage extends BasePage {
  // ==========================================================================
  // Navigation
  // ==========================================================================

  private readonly btnProducts: Locator;

  // ==========================================================================
  // Components
  // ==========================================================================

  private readonly search: SearchComponent;
  private readonly products: ProductGridComponent;
  private readonly cart: CartModalComponent;
  private readonly categories: CategoryComponent;
  private readonly brands: BrandComponent;

  constructor(page: Page) {
    super(page);

    this.btnProducts = page.locator("a[href='/products']");

    this.search = new SearchComponent(page);
    this.products = new ProductGridComponent(page);
    this.cart = new CartModalComponent(page);
    this.categories = new CategoryComponent(page);
    this.brands = new BrandComponent(page);
  }

  // ==========================================================================
  // Navigation
  // ==========================================================================

  /**
   * Opens Products page.
   */
  public async open() {
    Logger.info("Opening Products page.");

    await this.navigate(
      EnvironmentManager.getBaseUrl(),
      ApplicationRoutes.automationExercise.products
    );

    await this.verifyOpened();
  }

  public async openFromMenu() {
    await Promise.all([this.page.waitForURL(/products/), this.btnProducts.click()]);
  }

  /**
   * Verifies Products page.
   */
  public async verifyOpened(): Promise<this> {
    Logger.info("Verifying Products page.");

    await this.assertions.url(new RegExp(ApplicationRoutes.automationExercise.products));

    await this.search.verifyLoaded();

    return this;
  }

  // ==========================================================================
  // Search
  // ==========================================================================

  /**
   * Searches for a product.
   */
  public async searchProduct(product: Product | string) {
    await this.search.search(product);
  }

  // ==========================================================================
  // Product Grid
  // ==========================================================================

  /**
   * Returns displayed product count.
   */
  public async getProductCount(): Promise<number> {
    return this.products.getProductCount();
  }

  /**
   * Returns whether product exists.
   */
  public async containsProduct(product: Product): Promise<boolean> {
    return this.products.containsProduct(product);
  }

  /**
   * Opens Product Details page.
   */
  public async openProduct(product: Product) {
    await this.products.openProduct(product);
  }

  /**
   * Adds product to cart.
   */
  public async addToCart(product: Product) {
    await this.products.addToCart(product);

    await this.cart.verifyDisplayed();
  }

  // ==========================================================================
  // Cart Modal
  // ==========================================================================

  /**
   * Continue shopping.
   */
  public async continueShopping() {
    await this.cart.continueShopping();
  }

  /**
   * Opens shopping cart.
   */
  public async viewCart() {
    await this.cart.viewCart();
  }

  // ==========================================================================
  // Category
  // ==========================================================================

  /**
   * Selects category.
   */
  public async selectCategory(parentCategory: string, childCategory: string) {
    await this.categories.select(parentCategory, childCategory);
  }

  // ==========================================================================
  // Brand
  // ==========================================================================

  /**
   * Selects brand.
   */
  public async selectBrand(brand: string) {
    await this.brands.select(brand);
  }
}
