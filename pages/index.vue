<script setup lang="ts">
  import Autoplay from "embla-carousel-autoplay";
  import Swal from "sweetalert2";

  // ** APIs
  import MovieAPI from "@/apis/Movie.api";
  import TrendingAPI from "@/apis/Trending.api";

  // ** Helpers
  import { fullPathImage, fullYear, roundedRating } from "@/helpers/utils.helper";

  // ** Types
  import type { MovieDT } from "@/types/models/Movie.model";
  import type { TrendingDT } from "@/types/models/Trending.model";

  const plugin = Autoplay({
    delay: 3000,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
  });

  const loading = ref<Boolean>(true);
  const carouselLoading = ref<Boolean>(true);

  const isCapsuleIsPopular = ref<Boolean>(true);

  const movies = ref<MovieDT[]>([]);
  const trendings = ref<TrendingDT[]>([]);

  const getTrending = async () => {
    try {
      carouselLoading.value = true;
      
      const trendingAPI = await TrendingAPI.All();

      if (trendingAPI.status === 200) {
        trendings.value = trendingAPI.data.results.slice(0, 6);
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
      carouselLoading.value = false;
    }
  }

  const getMovie = async () => {
    try {
      loading.value = true;

      const movieAPI = isCapsuleIsPopular.value ? await MovieAPI.Popular() : await MovieAPI.Upcoming();

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
    getTrending();
    getMovie();
  })

  const handleCapsuleUpdate = (value: Boolean) => {
    isCapsuleIsPopular.value = value;
    getMovie();
  }
</script>

<template>
	<div>
    <div class="py-10">
      <Carousel class="relative py-10" :opts="{ loop: true }" :plugins="[plugin]">
        <CarouselContent>
          <CarouselItem v-for="(trending, i) in trendings" :key="i" class="max-w-[540px] mx-4">
            <div class="flex gap-[50px] bg-black p-3">
              <img :src="fullPathImage(trending.poster_path)" class="w-[200px] scale-125" />
              
              <div class="flex flex-col gap-3">
                <div class="flex gap-3 items-center font-semibold text-[18px]">
                  <img src="../public/icon-star.svg" /> {{ roundedRating(trending.vote_average) }}
                </div>
                <div class="text-[25px] font-medium">
                  {{ trending.name }}
                </div>
                <div class="text-[16px] flex gap-[8px] items-center">
                  {{ fullYear(trending.first_air_date) }} <img src="../public/icon-ellipse.svg" /> Sci-Fi
                </div>
                <div class="text-[12px]">
                  {{ trending.overview }}
                </div>
              </div>
            </div>
          </CarouselItem>         
        </CarouselContent>
      </Carousel>

      <div class="flex space-x-3 justify-center mt-10">
        <button type="button" v-for="(_, i) in trendings" :key="i" class="w-3 h-3 bg-mountain-mist rounded-full" />
      </div>
    </div>

		<div class="relative mt-[50px]">
			<div class="h-[250px] w-full bg-ebony-clay absolute top-[-30px] z-[-1]" />

			<Container>
				<div class="flex justify-between items-center mb-5">
					<TitleHead>discover movie</TitleHead>

					<div class="flex gap-3">
						<Capsule 
              :variant="isCapsuleIsPopular ? 'primary' : 'secondary'"
              @click="handleCapsuleUpdate(true)"
            >
              Popularity
            </Capsule>
						<Capsule 
              :variant="!isCapsuleIsPopular ? 'primary' : 'secondary'" 
              @click="handleCapsuleUpdate(false)"
            >
              Release Date
            </Capsule>
					</div>
				</div>

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
