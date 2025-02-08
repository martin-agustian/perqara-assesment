import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ** Types
import type { ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const fullPathImage = (value: string) => {
  return value ? `https://image.tmdb.org/t/p/w500${value}` : `../../public/the-movie-db-logo.svg`;
}

export const fullYear = (value: string) => {
  return new Date(value).getFullYear();
}

export const roundedRating = (value: number) => {
  return parseFloat(value.toFixed(1));
}