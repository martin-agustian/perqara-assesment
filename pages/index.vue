<script setup lang="ts">
  import Autoplay from "embla-carousel-autoplay";
  import ClassNames from "embla-carousel-class-names";
  import Swal from "sweetalert2";

  // ** APIs
  import DiscoverAPI from "@/apis/Discover.api";
  import TrendingAPI from "@/apis/Trending.api";

  // ** Helpers
  import { toFullPathImage, toFullYear, toRoundedRating } from "@/helpers/utils.helper";

  // ** Types
  import type { CarouselApi } from "@/components/carousel";
  import type { DiscoverMovieRequestDT } from "@/types/requests/Discover.request";
  import type { MovieDT } from "@/types/models/Movie.model";
  import type { TrendingDT } from "@/types/models/Trending.model";

  const emblaAutoPlay = Autoplay({
    delay: 5000,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
  });

  const emblaClassNames = ClassNames({
    snapped: "!opacity-100",
    inView: "opacity-50"
  });

  const carouselApiRef = ref<CarouselApi>();
  const carouselCurrentIndex = ref<number>(0);

  const loading = ref<Boolean>(true);
  const loadingCarousel = ref<Boolean>(true);

  const isCapsuleIsPopular = ref<Boolean>(true);

  const movies = ref<MovieDT[]>([]);
  const trendings = ref<TrendingDT[]>([]);

  const getTrending = async () => {
    try {
      loadingCarousel.value = true;
      
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
      loadingCarousel.value = false;
    }
  }

  const getMovie = async () => {
    try {
      loading.value = true;

      let params = {} as DiscoverMovieRequestDT;

      if (isCapsuleIsPopular.value) {
        params.sort_by = 'popularity.desc';
      }
      else {
        params.sort_by = 'primary_release_date.desc';
      }
      
      const discoverAPI = await DiscoverAPI.Movie(params);

      if (discoverAPI.status === 200) {
        movies.value = discoverAPI.data.results;
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

  watch(carouselApiRef, (carouselApi) => {
    if (!carouselApi) return;

    carouselApi.on('autoplay:select', (value) => {
      carouselCurrentIndex.value = value.selectedScrollSnap();
    });
  })

  const setCarouselAPI = (value: CarouselApi) => {
    carouselApiRef.value = value;
  }

  const handleCarouselScrollToIndex = (index: number) => {
    if (carouselApiRef.value) {
      carouselApiRef.value.scrollTo(index);
      carouselCurrentIndex.value = carouselApiRef.value.selectedScrollSnap();
    }
  }

  const handleCapsuleUpdate = (value: Boolean) => {
    isCapsuleIsPopular.value = value;
    getMovie();
  }
</script>

<template>
	<div>
    <div class="py-10">
      <Carousel @init-api="setCarouselAPI" class="relative py-10" :opts="{ loop: true, align: 'center' }" :plugins="[emblaAutoPlay, emblaClassNames]">
        <CarouselContent class="-ml-8">
          <template v-if="loadingCarousel">
            <CarouselItem v-for="(_, i) in Array.from({ length: 6 })" :key="i" class="max-w-[540px] pl-8">
              <div class="flex gap-[40px] bg-black animate-pulse p-4">
                <div class="h-[300px] min-w-[200px] bg-ebony-clay scale-125" />
                
                <div class="flex flex-col gap-3 w-full">
                  <div class="flex gap-2 items-center font-semibold text-[18px]">
                    <img src="../public/icon-star.svg" /> <div class="h-4 w-[20%] bg-ebony-clay" />
                  </div>
                  <div class="h-5 w-[80%] bg-ebony-clay" />
                  <div class="flex gap-[8px] items-center">
                    <div class="h-4 w-[20%] bg-ebony-clay" /> <img src="../public/icon-ellipse.svg" /> <div class="h-4 w-[20%] bg-ebony-clay" />
                  </div>
                  <div class="h-3 w-full bg-ebony-clay" />
                  <div class="h-3 w-full bg-ebony-clay" />
                  <div class="h-3 w-full bg-ebony-clay" />
                  <div class="h-3 w-[30%] bg-ebony-clay" />
                </div>
              </div>
            </CarouselItem>
          </template>

          <template v-else>
            <CarouselItem v-for="(trending, i) in trendings" :key="i" class="max-w-[540px] pl-8">
              <div class="flex gap-[40px] bg-black p-4">
                <img :src="toFullPathImage(trending.poster_path)" class="h-[300px] w-[200px] scale-125 object-fill" />
                
                <div class="flex flex-col gap-3 w-full">
                  <div class="flex gap-2 items-center font-semibold text-[18px]">
                    <img src="../public/icon-star.svg" /> {{ toRoundedRating(trending.vote_average) }}
                  </div>
                  <div class="text-[25px] font-medium">
                    {{ trending.name }}
                  </div>
                  <div class="text-[16px] flex gap-[8px] items-center">
                    {{ toFullYear(trending.first_air_date) }} <img src="../public/icon-ellipse.svg" /> Sci-Fi
                  </div>
                  <div class="text-[12px]">
                    {{ trending.overview }}
                  </div>
                </div>
              </div>
            </CarouselItem>
          </template>
        </CarouselContent>
      </Carousel>

      <div class="flex space-x-3 justify-center mt-10">
        <button
          v-for="(_, i) in trendings" :key="i" 
          :class="`h-3 ${carouselCurrentIndex == i ? 'w-10 bg-carmine-pink' : 'w-3 bg-mountain-mist'} rounded-full`"
          @click="handleCarouselScrollToIndex(i)" 
        />
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
					<Movie 
            v-for="(movie, i) in movies" :key="i"
            :id="movie.id"
            :title="movie.title"
            :poster-path="movie.poster_path" 
            :release-date="movie.release_date"
            :vote-average="movie.vote_average" 
          />
				</div>
			</Container>
		</div>
	</div>
</template>
