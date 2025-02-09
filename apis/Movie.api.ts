import { useAxios } from "@/composable/useAxios";

// ** Types
import type { MovieDetailRequestDT } from "@/types/requests/Movie.request";

// ** Paths
const path = "movie";

function Detail(movieId: number, params?: MovieDetailRequestDT) {
  return useAxios().get("/" + path + "/" + movieId, params);
}

const MovieAPI = { 
  Detail
};

export default MovieAPI;