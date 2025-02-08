<script setup lang="ts">
  import Swal from "sweetalert2";

  // ** APIs
  import DiscoverAPI from "@/apis/Discover.api";

  // ** Options
  import { genreOptions, sortTvShowOptions } from "@/commons/options";

  // ** Types
  import type { DiscoverMovieRequestDT } from "@/types/requests/Discover.request";
  import type { TvShowDT } from "@/types/models/TvShow.model";

  const sortFilter = ref<string>('');
  const genreFilter = ref<string[]>([]);

  const loading = ref<boolean>(true);

  const tvShows = ref<TvShowDT[]>([]);

  const getTVShow = async () => {
    try {
      loading.value = true;

      let params = {} as DiscoverMovieRequestDT;
      params.with_genres = genreFilter.value.toString();
      params.sort_by = sortFilter.value as string;

      const discoverAPI = await DiscoverAPI.TV(params);

      if (discoverAPI.status === 200) {
        tvShows.value = discoverAPI.data.results
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
    getTVShow();
  })

  const handleSort = (value: string) => {
    sortFilter.value = value;
    getTVShow();
  }

  const handleGenre = (value: string[]) => {
    genreFilter.value = value;
    getTVShow();
  }
</script>

<template>
	<div>
    <List 
      title="movies"
      :loading="loading"
      :genre-options="genreOptions"
      :sort-options="sortTvShowOptions"
      @update:genre="handleGenre"
      @update:sort="handleSort"
    >
      <Movie 
        v-for="(tvShow, i) in tvShows" :key="i" 
        :title="tvShow.name"
        :poster-path="tvShow.poster_path" 
        :release-date="tvShow.first_air_date"
        :vote-average="tvShow.vote_average"
      />
    </List>
	</div>
</template>
