import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const instance = axios.create();
  instance.defaults.baseURL = config.public.apiBase;
  instance.defaults.headers.common["authorization"] = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWNjOTc5NWFjOWE0M2QyZTlhZjdmMjM0NWVjMGIxZiIsIm5iZiI6MTczODk1NDYxNS4zMDU5OTk4LCJzdWIiOiI2N2E2NTc3NzhkYmI0YzA5OTA2NzA3ZWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.prU0lgMi05Kz1YcqdxJ163Euuzvi0SeAcWtX3NZpSG8";
  instance.defaults.timeout = 60000;

  nuxtApp.provide("axios", instance);
});
