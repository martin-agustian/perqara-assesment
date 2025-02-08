<script setup lang="ts">
  import Swal from "sweetalert2";

  // ** APIs
  import DiscoverAPI from "@/apis/Discover.api";

  // ** Options
  import { genreOptions, sortMovieOptions } from "@/commons/options";

  // ** Types
  import type { DiscoverMovieRequestDT } from "@/types/requests/Discover.request";
  import type { MovieDT } from "@/types/models/Movie.model";

  const sortFilter = ref<string>('');
  const genreFilter = ref<string[]>([]);

  const loading = ref<boolean>(true);

  const movies = ref<MovieDT[]>([]);

  const getMovie = async () => {
    try {
      loading.value = true;

      let params = {} as DiscoverMovieRequestDT;
      params.with_genres = genreFilter.value.toString();
      params.sort_by = sortFilter.value;

      const discoverAPI = await DiscoverAPI.Movie(params);

      if (discoverAPI.status === 200) {
        movies.value = discoverAPI.data.results
      }
    }
    catch (error) {
      await Swal.fire({
        title: "Error!",
        text: error as string,
        icon: "error"
      });
    }
    finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    getMovie();
  })

  const handleSort = (value: string) => {
    sortFilter.value = value;
    getMovie();
  }

  const handleGenre = (value: string[]) => {
    genreFilter.value = value;
    getMovie();
  }
</script>

<template>
  <div>
    <List 
      title="movies"
      :loading="loading"
      :genre-options="genreOptions"
      :sort-options="sortMovieOptions"
      @update:genre="handleGenre"
      @update:sort="handleSort"
    >
      <Movie 
        v-for="(movie, i) in movies" :key="i"
        :title="movie.title"
        :poster-path="movie.poster_path" 
        :release-date="movie.release_date"
        :vote-average="movie.vote_average" 
      />
    </List>
  </div>
</template>
