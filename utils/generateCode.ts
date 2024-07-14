export function generateTicketCode() {
  const prefix = 'TK_';
  const randomNumber = Math.floor(Math.random() * 1000000);
  const paddedNumber = String(randomNumber).padStart(6, '0');
  return prefix + paddedNumber;
}
