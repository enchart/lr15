const priceFormat = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});

export function formatPrice(price: number) {
  return priceFormat.format(price / 100);
}
