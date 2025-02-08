import { useAxios } from "@/composable/useAxios";

// ** Types
import type { PopularMovieRequestDT } from "@/types/requests/Movie.request";

// ** Paths
const path = "movie";

function Popular(params?: PopularMovieRequestDT) {
  return useAxios().get("/" + path + "/popular", params);
}

const MovieAPI = { 
  Popular
};

export default MovieAPI;