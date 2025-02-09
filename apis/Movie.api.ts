import { useAxios } from "@/composable/useAxios";

// ** Types
import type { 
  MovieDetailRequestDT, 
  MovieReviewRequestDT 
} from "@/types/requests/Movie.request";

// ** Paths
const path = "movie";

function Detail(movieId: number, params?: MovieDetailRequestDT) {
  return useAxios().get("/" + path + "/" + movieId, params);
}

function Review(movieId: number, params?: MovieReviewRequestDT) {
  return useAxios().get("/" + path + "/" + movieId + "/reviews", params);
}

const MovieAPI = { 
  Detail, Review
};

export default MovieAPI;