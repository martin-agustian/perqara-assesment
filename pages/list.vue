<script setup lang="ts">
  import Swal from "sweetalert2";

  // ** APIs
  import MovieAPI from "@/apis/Movie.api";

  // ** Helpers
  import { fullPathImage, fullYear, roundedRating } from "@/helpers/utils.helper";

  // ** Types
  import type { OptionsDT } from "@/commons/types";
  import type { MovieDT } from "@/types/models/Movie.model";

  const sortOptions: OptionsDT[] = [
    {
      label: 'Popularity Ascending',
      value: 'popularity'
    },
    {
      label: 'Popularity Descending',
      value: 'popularity 2'
    },
    {
      label: 'Release Date Ascending',
      value: 'popularity 3'
    },
    {
      label: 'Release Date Descending',
      value: 'popularity 4'
    },
    {
      label: 'Rating Ascending',
      value: 'popularity 5'
    },
    {
      label: 'Rating Descending',
      value: 'popularity 6'
    },
  ];

  const sortFilter = defineModel<string>('');

  const loading = ref<Boolean>(true);

  const movies = ref<MovieDT[]>([]);

  const getMovie = async () => {
    try {
      loading.value = true;

      const movieAPI = await MovieAPI.Popular();

      if (movieAPI.status === 200) {
        movies.value = movieAPI.data.results
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
                :data="sortOptions"
                placeholder="Popularity" 
                trigger-size="xs"
                v-model="sortFilter" 
              />              
            </div>
            <div class="font-semibold border-t border-white/20 px-4 py-3">
              Genres
            </div>
            <div class="border-t border-white/20 p-4">
              <FormCheckbox
                id=""
                label="Action"
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
