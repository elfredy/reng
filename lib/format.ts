/** Azərbaycan manatı - AZN, simvol: ₼ */
export const CURRENCY_SYMBOL = "₼";
export const CURRENCY_CODE = "AZN";
const LOCALE = "az-AZ";

export function formatPrice(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString(LOCALE)}`;
}
