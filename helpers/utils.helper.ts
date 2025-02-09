import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ** Types
import type { ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const toFullPathImage = (value: string, size: string = 'w500') => {
  return value ? `https://image.tmdb.org/t/p/${size}${value}` : `/public/the-movie-db-logo.svg`;
}

export const toFullDate = (value: string) => {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export const toFullYear = (value: string) => {
  return new Date(value).getFullYear();
}

export const toRoundedRating = (value: number) => {
  return (Math.round(value * 10) / 10).toFixed(1);
}

export const toMoney = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export const setSpaceClear = (value: string): string => {
	return value.replace(/\s+/g, '');
}

export const setLetterClear = (value: string): string => {
	return value.replace(/[^\d]/g, '');
}