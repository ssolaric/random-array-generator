import random from "lodash.random";

// Get k different values from the interval [lo, hi]
function sampleWithoutRepetition(lo, hi, k) {
  if (k > hi - lo + 1) {
    throw new Error(
      "The array size must not be greater than the length of the allowed range."
    );
  }
  const selected = new Set();
  for (let i = 0; i < k; i++) {
    let num;
    do {
      num = random(lo, hi, false);
    } while (selected.has(num));
    selected.add(num);
  }
  return Array.from(selected);
}

// Get k possibly repeated values from the interval [lo, hi]
function sampleWithRepetition(lo, hi, k) {
  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(random(lo, hi, false));
  }
  return result;
}

export default function generateArray({
  arraySize,
  minimumValue,
  maximumValue,
  allowRepeated,
}) {
  const sample = allowRepeated ? sampleWithRepetition : sampleWithoutRepetition;
  return sample(minimumValue, maximumValue, arraySize);
}
