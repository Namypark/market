import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "NGN";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "NGN", notation = "compact" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  const locale = currency === "NGN" ? "en-NG" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
