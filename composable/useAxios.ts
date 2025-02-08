import type { AxiosStatic } from "axios";

export const useAxios = () => {
  return useNuxtApp().$axios as AxiosStatic;
}