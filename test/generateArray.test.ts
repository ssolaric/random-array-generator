import { describe, it, expect } from "vitest";
import generateArray from "../src/generateArray";

describe("generate random numbers in a range without repetition", () => {
  it("generates random numbers in a valid range", () => {
    const arraySize = 20;
    const minimumValue = 1;
    const maximumValue = 100;
    const array = generateArray({
      arraySize,
      minimumValue,
      maximumValue,
      allowRepeated: false,
    });
    for (const x of array) {
      expect(x).toBeGreaterThanOrEqual(minimumValue);
      expect(x).toBeLessThanOrEqual(maximumValue);
    }
    const set = new Set(array);
    expect(set.size).toBe(arraySize);
  });

  it("throws an error for an invalid range", () => {
    const arraySize = 20;
    const minimumValue = 1;
    const maximumValue = 10;
    expect(() =>
      generateArray({
        arraySize,
        minimumValue,
        maximumValue,
        allowRepeated: false,
      })
    ).toThrow();
  });
});

describe("generate random numbers in a range with repetition", () => {
  it("generates random numbers in a valid range", () => {
    const arraySize = 20;
    const minimumValue = 1;
    const maximumValue = 100;
    const array = generateArray({
      arraySize,
      minimumValue,
      maximumValue,
      allowRepeated: true,
    });
    for (const x of array) {
      expect(x).toBeGreaterThanOrEqual(minimumValue);
      expect(x).toBeLessThanOrEqual(maximumValue);
    }
  });
});
