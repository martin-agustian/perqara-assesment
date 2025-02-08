import { useAxios } from "@/composable/useAxios";

// ** Types
import type { DiscoverMovieRequestDT } from "@/types/requests/Discover.request";

// ** Paths
const path = "discover";

function Movie(params?: DiscoverMovieRequestDT) {
  return useAxios().get("/" + path + "/movie", { params: params });
}

const DiscoverAPI = { 
  Movie
};

export default DiscoverAPI;