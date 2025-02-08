import { useAxios } from "@/composable/useAxios";

// ** Types
import type { PopularMovieRequestDT, UpcomingMovieRequestDT } from "@/types/requests/Movie.request";

// ** Paths
const path = "movie";

function Popular(params?: PopularMovieRequestDT) {
  return useAxios().get("/" + path + "/popular", params);
}

function Upcoming(params?: UpcomingMovieRequestDT) {
  return useAxios().get("/" + path + "/upcoming", params);
}

const MovieAPI = { 
  Popular, Upcoming
};

export default MovieAPI;