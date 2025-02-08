<script setup lang="ts">
  import Swal from "sweetalert2";

  // ** APIs
  import DiscoverAPI from "@/apis/Discover.api";

  // ** Options
  import { genreOptions, sortMovieOptions } from "@/commons/options";

  // ** Types
  import type { DiscoverMovieRequestDT } from "@/types/requests/Discover.request";
  import type { MovieDT } from "@/types/models/Movie.model";

  const genreFilter = ref<string[]>([]);
  const sortFilter = ref<string>('');
  const pageFilter = ref<number>(1);

  const isLoadMore = ref(true);

  const loading = ref<boolean>(true);
  const loadMoreLoading = ref<boolean>(true);

  const movies = ref<MovieDT[]>([]);

  const getMovie = async () => {
    try {
      let params = {} as DiscoverMovieRequestDT;
      params.with_genres = genreFilter.value.toString();
      params.sort_by = sortFilter.value;
      params.page = pageFilter.value;

      const discoverAPI = await DiscoverAPI.Movie(params);

      if (discoverAPI.status === 200) {
        let { data } = discoverAPI;

        if (data.page == data.total_pages) {
          isLoadMore.value = false;
        }

        if (loadMoreLoading.value) {
          movies.value = [...movies.value, ...data.results];
        }
        else {
          movies.value = data.results;
        }
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
      loadMoreLoading.value = false;
      loading.value = false;
    }
  }

  onMounted(() => {
    loading.value = true;
    getMovie();
  })

  const handleSort = (value: string) => {
    sortFilter.value = value;
    loading.value = true;
    getMovie();
  }

  const handleGenre = (value: string[]) => {
    genreFilter.value = value;
    loading.value = true;
    getMovie();
  }

  const handleLoadMore = () => {
    loadMoreLoading.value = true;
    pageFilter.value += 1;
    getMovie();
  }
</script>

<template>
  <div>
    <List 
      title="movies"
      :is-load-more="isLoadMore"
      :loading="loading"
      :genre-options="genreOptions"
      :sort-options="sortMovieOptions"
      @update:genre="handleGenre"
      @update:sort="handleSort"
      @click:more="handleLoadMore"
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
