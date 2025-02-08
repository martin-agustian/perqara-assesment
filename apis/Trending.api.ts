import { useAxios } from "@/composable/useAxios";

// ** Types
import type { AllTrendingRequestDT } from "@/types/requests/Trending.request";

// ** Paths
const path = "trending";

function All(params?: AllTrendingRequestDT) {
  return useAxios().get("/" + path + "/all/day", params);
}

const TrendingAPI = { 
  All
};

export default TrendingAPI;
