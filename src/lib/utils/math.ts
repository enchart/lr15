export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function weightedRandom<T extends Record<string, number>>(obj: T): keyof T {
  let result;
  let total = 0;

  for (const property in obj) {
    total += obj[property];
  }

  let index = Math.random() * total;

  for (const property in obj) {
    const value = obj[property];
    if (index < value) {
      result = property;
      break;
    } else {
      index -= value;
    }
  }

  return result!;
}
