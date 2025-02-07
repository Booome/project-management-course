import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | null, defaultText: string = "") {
  if (!date) return defaultText;

  return format(date, "MM/dd/yyyy");
}
