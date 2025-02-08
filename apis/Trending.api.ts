import { useAxios } from "@/composable/useAxios";

// ** Types
import type { TrendingRequestDT } from "@/types/requests/Trending.request";

// ** Paths
const path = "trending";

function All(params?: TrendingRequestDT) {
  return useAxios().get("/" + path + "/all/day", params);
}

const TrendingAPI = { 
  All
};

export default TrendingAPI;
