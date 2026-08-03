export class RandomDataUtil {
  static number(min = 100, max = 9999): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static productName(): string {
    return `Product-${Date.now()}`;
  }

  static email(): string {
    return `user${Date.now()}@test.com`;
  }

  static firstName(): string {
    return `John${this.number()}`;
  }

  static lastName(): string {
    return `Doe${this.number()}`;
  }

  public static postTitle(): string {
    return `SamplePost${this.number()}`;
  }
}
