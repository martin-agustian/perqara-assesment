import { useAxios } from "@/composable/useAxios";

// ** Types
import type { DiscoverMovieRequestDT } from "@/types/requests/Discover.request";

// ** Paths
const path = "discover";

function Movie(params?: DiscoverMovieRequestDT) {
  return useAxios().get("/" + path + "/movie", { params: params });
}

function TV(params?: DiscoverMovieRequestDT) {
  return useAxios().get("/" + path + "/tv", { params: params });
}

const DiscoverAPI = { 
  Movie, TV
};

export default DiscoverAPI;