import { useAxios } from "@/composable/useAxios";

// ** Paths
const path = "movie";

function Detail(movieId: number) {
  return useAxios().get("/" + path + "/" + movieId);
}

function Review(movieId: number) {
  return useAxios().get("/" + path + "/" + movieId + "/reviews");
}

function Recommendation(movieId: number) {
  return useAxios().get("/" + path + "/" + movieId + "/recommendations");
}

const MovieAPI = { 
  Detail, Review, Recommendation
};

export default MovieAPI;