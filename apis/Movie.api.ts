import { useAxios } from "@/composable/useAxios";

// ** Types
import type {
  MovieDetailRequestDT, 
  MovieRecommendationRequestDT, 
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

function Recommendation(movieId: number, params?: MovieRecommendationRequestDT) {
  return useAxios().get("/" + path + "/" + movieId + "/recommendations", params);
}

const MovieAPI = { 
  Detail, Review, Recommendation
};

export default MovieAPI;