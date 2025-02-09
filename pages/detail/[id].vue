<script setup lang="ts">
  import Swal from "sweetalert2";

  // ** APIs
  import MovieAPI from "@/apis/Movie.api";

  // ** Helpers
  import { toFullDate, toFullPathImage, toFullYear, toMoney, toRoundedRating } from "@/helpers/utils.helper";

  // ** Types
  import type { MovieDT } from "@/types/models/Movie.model";
  import type { ReviewDT } from "@/types/models/Review.model";

  const route = useRoute();

  const loading = ref<boolean>(true);

  const movieId = Number(route.params.id);

  const movie = ref<MovieDT>();
  const reviews = ref<ReviewDT[]>();

  const getDetail = async () => {
    try {
      const movieAPI = await MovieAPI.Detail(movieId);

      if (movieAPI.status === 200) {
        let { data } = movieAPI;
        movie.value = data;
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

  const getReview = async () => {
    try {
      const movieAPI = await MovieAPI.Review(movieId);

      if (movieAPI.status === 200) {
        let { data } = movieAPI;
        reviews.value = data.results.slice(0, 2);
      }
    }
    catch (error) {
      await Swal.fire({
        title: "Error!",
        text: error as string,
        icon: "error"
      });
    }
  }

  onMounted(() => {
    loading.value = true;
    getDetail();
    getReview();
  })
</script>

<template>
  <div v-if="movie">
      <div class="">
        <div class="relative">
          <Container class="absolute top-[320px] left-[50%] translate-x-[-50%] z-10">
            <img :src="toFullPathImage(movie.poster_path)" class="h-[350px]">
          </Container>

          <div class="h-[500px] relative bg-transparent">
            <img :src="toFullPathImage(movie.backdrop_path, 'original')" class="absolute bg-no-repeat bg-center bg-cover inset-0 brightness-50 z-[-1]">
            <Container class="flex items-end h-full pl-72">
              <div>
                <div class="text-[18px]">
                  {{ toFullYear(movie.release_date) }}
                </div>
      
                <div class="text-[30px] font-medium">
                  {{ movie.title }}
                </div>
              </div>
            </Container>
          </div>

          <div class="bg-black/50 text-white">
            <Container class="pl-72">
              <div class="flex gap-4 items-center justify-between">
  
                <div class="flex gap-4 items-center">
                  <div class="flex gap-3 items-center">
                    <img src="/public/icon-star.svg" class="size-[36px]" /> 
                    <div class="text-[28px] font-semibold">
                      {{ toRoundedRating(movie.vote_average) ?? 0 }}
                    </div>            
                  </div>
  
                  <div class="text-[12px]">
                    <div class="uppercase text-white/50">
                      user score
                    </div>
                    <div class="uppercase">
                      {{ movie.vote_count ?? '-' }} votes
                    </div>
                  </div>
                </div>
  
                <div class="border-r border-white/20 h-8" />
  
                <div class="text-[12px]">
                  <div class="uppercase text-white/50">
                    status
                  </div>
                  <div class="uppercase">
                    {{ movie.status ?? '-' }}
                  </div>
                </div>
  
                <div class="border-r border-white/20 h-8" />
  
                <div class="text-[12px]">
                  <div class="uppercase text-white/50">
                    language
                  </div>
                  <div class="uppercase">
                    {{ movie.spoken_languages?.[0]?.name ?? '-' }}
                  </div>
                </div>
  
                <div class="border-r border-white/20 h-8" />
  
                <div class="text-[12px]">
                  <div class="uppercase text-white/50">
                    budget
                  </div>
                  <div class="uppercase">
                    {{ movie.budget ? toMoney(movie.budget) : '-' }}
                  </div>
                </div>
  
                <div class="border-r border-white/20 h-8" />
  
                <div class="text-[12px]">
                  <div class="uppercase text-white/50">
                    production
                  </div>
                  <div class="uppercase">
                    {{ movie.production_companies?.[0]?.name ?? '-' }}
                  </div>
                </div>
              </div>
            </Container>
          </div>

          <div class="bg-white text-black">
            <Container class="pl-72">
              <div class="text-carmine-pink font-semibold mb-2">
                Overview
              </div>
              <div class="text-[14px]">
                {{ movie.overview }}
              </div>
            </Container>
          </div>
        </div>

        <div class="bg-white text-black">
          <Container>
            <div class="text-carmine-pink font-semibold mb-3">
              Reviews
            </div>

            <div v-if="reviews && reviews.length > 0" class="grid grid-cols-2 gap-x-3">
              <div v-for="(review, i) in reviews" :key="i" class="bg-snow-drift rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div class="flex gap-3 items-center">
                    <img :src="toFullPathImage(review.author_details.avatar_path)" class="size-14 rounded-full">

                    <div>
                      <div class="text-[14px] font-semibold">
                        {{ review.author_details.username }}
                      </div>
                      <div class="text-[12px] text-ironside-grey">
                        {{ toFullDate(review.created_at) }}
                      </div>
                    </div>
                  </div>
  
                  <div class="bg-green-white rounded-md p-3">
                    <div class="flex gap-2 items-start">
                      <img src="/public/icon-star.svg" class="size-[20px]" /> 
                      <div class="text-[28px] font-semibold leading-none">
                        {{ toRoundedRating(review.author_details.rating) }}
                      </div>            
                    </div>
                  </div>
                </div>
  
                <div class="text-[13px] italic mt-5" v-html="review.content" />
              </div>
            </div>
            <div v-else class="text-[14px]">
              -
            </div>
          </Container>
        </div>
      </div>
  </div>
</template>