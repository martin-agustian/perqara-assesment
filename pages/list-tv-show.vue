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
  const pageFilter = ref<number>(1);

  const isLoadMore = ref<boolean>(true);

  const loading = ref<boolean>(true);
  const loadMoreLoading = ref<boolean>(false);

  const tvShows = ref<TvShowDT[]>([]);

  const getTVShow = async () => {
    try {
      let params = {} as DiscoverMovieRequestDT;
      params.with_genres = genreFilter.value.toString();
      params.sort_by = sortFilter.value;
      params.page = pageFilter.value

      const discoverAPI = await DiscoverAPI.TV(params);

      if (discoverAPI.status === 200) {
        let { data } = discoverAPI;

        if (data.page == data.total_pages) {
          isLoadMore.value = false;
        }

        if (loadMoreLoading.value) {
          tvShows.value = [...tvShows.value, ...data.results];
        }
        else {
          tvShows.value = data.results;
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
    getTVShow();
  })

  const handleSort = (value: string) => {
    sortFilter.value = value;
    loading.value = true;
    getTVShow();
  }

  const handleGenre = (value: string[]) => {
    genreFilter.value = value;
    loading.value = true;
    getTVShow();
  }

  const handleLoadMore = () => {
    loadMoreLoading.value = true;
    pageFilter.value += 1;
    getTVShow();
  }
</script>

<template>
	<List 
    title="tv shows"
    :is-load-more="isLoadMore"
    :loading="loading"
    :load-more-loading="loadMoreLoading"
    :genre-options="genreOptions"
    :sort-options="sortTvShowOptions"
    @update:genre="handleGenre"
    @update:sort="handleSort"
    @click:more="handleLoadMore"
  >
    <template v-if="tvShows.length > 0">
      <Movie 
        v-for="(tvShow, i) in tvShows" :key="i" 
        :id="tvShow.id"
        :title="tvShow.name"
        :poster-path="tvShow.poster_path" 
        :release-date="tvShow.first_air_date"
        :vote-average="tvShow.vote_average"
      />
    </template>
    <div v-else class="text-white text-[18px] font-semibold mt-3">
      TV Show is not found
    </div>
  </List>
</template>
