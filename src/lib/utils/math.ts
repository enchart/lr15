export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomFromList<T>(...list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}
