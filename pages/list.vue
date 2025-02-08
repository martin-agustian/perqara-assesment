<script setup lang="ts">
  import Swal from "sweetalert2";

  // ** APIs
  import DiscoverAPI from "@/apis/Discover.api";

  // ** Helpers
  import { fullPathImage, fullYear, roundedRating } from "@/helpers/utils.helper";

  // ** Types
  import type { OptionsDT } from "@/commons/types";
  import type { DiscoverMovieRequestDT } from "@/types/requests/Discover.request";
  import type { MovieDT } from "@/types/models/Movie.model";

  const sortOptions: OptionsDT[] = [
    {
      label: 'Popularity Ascending',
      value: 'popularity.asc'
    },
    {
      label: 'Popularity Descending',
      value: 'popularity.desc'
    },
    {
      label: 'Release Date Ascending',
      value: 'primary_release_date.asc'
    },
    {
      label: 'Release Date Descending',
      value: 'primary_release_date.desc'
    },
    {
      label: 'Rating Ascending',
      value: 'vote_average.asc'
    },
    {
      label: 'Rating Descending',
      value: 'vote_average.desc'
    },
  ];

  const genreOptions: OptionsDT[] = [
    {
      label: 'Action',
      value: '28'
    },
    {
      label: 'Adventure',
      value: '12'
    },
    {
      label: 'Animation',
      value: '16'
    },
    {
      label: 'Comedy',
      value: '35'
    },
    {
      label: 'Crime',
      value: '80'
    },
    {
      label: 'Documentary',
      value: '99'
    },
    {
      label: 'Drama',
      value: '18'
    },
    {
      label: 'Family',
      value: '10751'
    },
    {
      label: 'Fantasy',
      value: '14'
    },
    {
      label: 'History',
      value: '36'
    },
    {
      label: 'Horror',
      value: '27'
    },
  ];

  const sortFilter = ref<String>('');
  const genreFilter = ref<String[]>([]);

  const loading = ref<Boolean>(true);

  const movies = ref<MovieDT[]>([]);

  const getMovie = async () => {
    try {
      loading.value = true;

      let params = {} as DiscoverMovieRequestDT;
      params.with_genres = genreFilter.value.toString();
      params.sort_by = sortFilter.value as string;

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

  const handleGenre = (option: OptionsDT, isChecked: Boolean) => {
    if (isChecked) {
      genreFilter.value.push(option.value);
    }
    else {
      genreFilter.value = genreFilter.value.filter(item => item !== option.value);
    }

    getMovie();
  }
</script>

<template>
	<div>
		<div class="relative">
			<div class="h-[250px] w-full bg-ebony-clay absolute top-[-30px] z-[-1]" />

      <Container>
        <TitleHead class="uppercase text-[36px] mb-8">movies</TitleHead>

        <div class="grid grid-cols-4 gap-6">
          <div class="bg-mirage rounded-md h-max">
            <div class="font-semibold px-4 py-3">
              Sort Result By
            </div>
            <div class="border-t border-white/20 p-4 pb-7">
              <FormSelect
                id="sorting"
                placeholder="Select Sorting" 
                :data="sortOptions"
                trigger-size="xs"
                @update:model-value="handleSort"
              />              
            </div>
            <div class="font-semibold border-t border-white/20 px-4 py-3">
              Genres
            </div>
            <div class="flex flex-col gap-y-5 border-t border-white/20 p-4">
              <FormCheckbox
                v-for="(option, i) in genreOptions" :key="i"
                :id="option.value"
                :label="option.label"
                @update:model-value="(isChecked) => handleGenre(option, isChecked)"
              />
            </div>
          </div>

          <div class="col-span-3">
            <div v-if="loading" class="py-40">
              <Loading />
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <Movie v-for="(movie, i) in movies" :key="i" :movie="movie" />
            </div>
          </div>
        </div>
      </Container>
		</div>
	</div>
</template>
