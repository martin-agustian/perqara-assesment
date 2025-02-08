<script setup lang="ts">
  import Swal from "sweetalert2";

  // ** APIs
  import MovieAPI from "@/apis/Movie.api";

  // ** Helpers
  import { fullPathImage, fullYear, roundedRating } from "@/helpers/utils.helper";

  // ** Types
  import type { MovieDT } from "@/types/models/Movie.model";

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

        <div v-if="loading" class="py-40">
          <Loading />
        </div>
				<div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
					<Movie v-for="(movie, i) in movies" :key="i" :movie="movie" />
				</div>
			</Container>
		</div>
	</div>
</template>
