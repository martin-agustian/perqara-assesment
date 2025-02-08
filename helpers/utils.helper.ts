import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ** Types
import type { ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const imageFullPath = (path?: string) => {
  return `https://image.tmdb.org/t/p/original/${path}`;
}
