import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ** Types
import type { ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const fullPathImage = (value: string, size: string = 'w500') => {
  return value ? `https://image.tmdb.org/t/p/${size}${value}` : `../../public/the-movie-db-logo.svg`;
}

export const fullYear = (value: string) => {
  return new Date(value).getFullYear();
}

export const roundedRating = (value: number) => {
  return parseFloat(value.toFixed(1));
}