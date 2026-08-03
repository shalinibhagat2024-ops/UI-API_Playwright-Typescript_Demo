import { expect } from "@playwright/test";

export class CommonAssertions {
  static verifyId(id: number): void {
    expect(id).toBeGreaterThan(0);
  }

  static verifyString(actual: string, expected: string): void {
    expect(actual).toBe(expected);
  }

  static verifyNumber(actual: number, expected: number): void {
    expect(actual).toBe(expected);
  }

  static verifyBoolean(actual: boolean, expected: boolean): void {
    expect(actual).toBe(expected);
  }

  static verifyNotEmpty(value: string | undefined | null): void {
    expect(value, "Expected value to be defined").toBeDefined();

    expect(value, "Expected value not to be null").not.toBeNull();

    expect(value?.trim(), "Expected string not to be empty").not.toBe("");
  }

  static verifyContains(actual: string, expected: string): void {
    expect(actual).toContain(expected);
  }

  static verifyGreaterThan(actual: number, expected: number): void {
    expect(actual).toBeGreaterThan(expected);
  }

  static verifyGreaterThanOrEqual(actual: number, expected: number): void {
    expect(actual).toBeGreaterThanOrEqual(expected);
  }

  static verifyArrayNotEmpty<T>(items: T[]): void {
    expect(items.length).toBeGreaterThan(0);
  }

  static verifyDefined(value: unknown): void {
    expect(value).toBeDefined();
    expect(value).not.toBeNull();
  }

  static verifyArray(actual: readonly unknown[], expected: readonly unknown[]): void {
    expect(actual).toEqual(expected);
  }

  static verifyLength(actual: unknown[], expected: number): void {
    expect(actual.length).toBe(expected);
  }

  static verifyEmpty<T>(items: T[]): void {
    expect(items.length).toBe(0);
  }

  static verifyLessThan(actual: number, expected: number): void {
    expect(actual).toBeLessThan(expected);
  }
}
