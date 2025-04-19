let balance = $state(0);

export function getBalance() {
  return balance;
}

export function setBalance(amount: number) {
  balance = amount;
}

export function addBalance(amount: number) {
  balance += amount;
}

export function removeBalance(amount: number) {
  balance -= amount;
}
