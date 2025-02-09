import { useAxios } from "@/composable/useAxios";

// ** Types
import type { SearchMovieRequestDT } from "@/types/requests/Search.request";

// ** Paths
const path = "search";

function Movie(params?: SearchMovieRequestDT) {
  return useAxios().get("/" + path + "/movie", { params: params });
}

const SearchAPI = { 
  Movie
};

export default SearchAPI;