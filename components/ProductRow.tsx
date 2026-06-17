import { isDiscountQty, formatPrice } from "../lib/utils";
import type { Product } from "../lib/types";

interface Props {
  product: Product;
}

export default function ProductRow({ product }: Props) {
  const { name, qty, price } = product;
  const showBadge = qty.length > 0;
  const discount = showBadge && isDiscountQty(qty);
  const formattedPrice = formatPrice(price);

  return (
    <div className="flex items-start justify-between gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 leading-snug break-words">{name}</p>
        {showBadge && (
          <span
            className={`mt-1.5 inline-block px-2 py-0.5 rounded text-xs font-semibold ${
              discount ? "bg-black text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {qty}
          </span>
        )}
      </div>
      <div className="text-right shrink-0 pt-0.5">
        <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
          {formattedPrice ?? "—"}
        </span>
      </div>
    </div>
  );
}
