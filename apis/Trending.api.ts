import { useAxios } from "@/composable/useAxios";

// ** Paths
const path = "trending";

function All() {
  return useAxios().get("/" + path + "/all/day");
}

const TrendingAPI = { 
  All
};

export default TrendingAPI;
