export function isDiscountQty(qty: string): boolean {
  return /(\d+\+|\bFALAS\b|falas)/i.test(qty);
}

export function formatPrice(raw: string): string | null {
  if (!raw) return null;
  if (/^\d+(\.\d+)?$/.test(raw.trim())) return raw.trim() + " ALL";
  return raw;
}
