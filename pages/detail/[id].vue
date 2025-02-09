<script setup lang="ts">
  import Swal from "sweetalert2";

  // ** APIs
  import MovieAPI from "@/apis/Movie.api";

  // ** Helpers
  import { fullPathImage, fullYear, roundedRating } from "@/helpers/utils.helper";

  // ** Types
  import type { MovieDT } from "@/types/models/Movie.model";

  const route = useRoute();

  const loading = ref<boolean>(true);

  const movieId = Number(route.params.id);

  const movie = ref<MovieDT>();

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

  onMounted(() => {
    loading.value = true;
    getDetail();
  })
</script>

<template>
  <div v-if="movie">
      <div class="">
        <div class="relative">
          <Container class="absolute top-[320px] left-[50%] translate-x-[-50%] z-10">
            <img :src="fullPathImage(movie.poster_path)" class="h-[350px]">
          </Container>

          <div class="h-[500px] relative bg-transparent">
            <img :src="fullPathImage(movie.backdrop_path, 'original')" class="absolute bg-no-repeat bg-center bg-cover inset-0 brightness-50 z-[-1]">
            <Container class="flex items-end h-full pl-72">
              <div>
                <div class="text-[18px]">
                  {{ fullYear(movie.release_date) }}
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
                      {{ roundedRating(movie.vote_average) }}
                    </div>            
                  </div>
  
                  <div class="text-[12px]">
                    <div class="uppercase text-white/50">
                      user score
                    </div>
                    <div class="uppercase">
                      {{ movie.vote_count }} votes
                    </div>
                  </div>
                </div>
  
                <div class="border-r border-white/20 h-8" />
  
                <div class="text-[12px]">
                  <div class="uppercase text-white/50">
                    status
                  </div>
                  <div class="uppercase">
                    {{ movie.status }}
                  </div>
                </div>
  
                <div class="border-r border-white/20 h-8" />
  
                <div class="text-[12px]">
                  <div class="uppercase text-white/50">
                    language
                  </div>
                  <div class="uppercase">
                    {{ movie.vote_count }}
                  </div>
                </div>
  
                <div class="border-r border-white/20 h-8" />
  
                <div class="text-[12px]">
                  <div class="uppercase text-white/50">
                    budget
                  </div>
                  <div class="uppercase">
                    {{ movie.budget }}
                  </div>
                </div>
  
                <div class="border-r border-white/20 h-8" />
  
                <div class="text-[12px]">
                  <div class="uppercase text-white/50">
                    production
                  </div>
                  <div class="uppercase">
                    {{ movie.production_companies[0].name }}
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
            <div class="bg-snow-drift rounded-lg p-4">

              <div class="flex items-center justify-between">
                <div>
                  <div class="text-[14px] font-semibold">
                    SWITCH
                  </div>
                  <div class="text-[12px] text-ironside-grey">
                    December 18, 2020
                  </div>
                </div>

                <div class="bg-green-white rounded-md p-3">
                  <div class="flex gap-2 items-start">
                    <img src="/public/icon-star.svg" class="size-[20px]" /> 
                    <div class="text-[28px] font-semibold leading-none">
                      {{ roundedRating(movie.vote_average) }}
                    </div>            
                  </div>
                </div>
              </div>

              <div class="text-[13px] italic mt-3">
                It isn't as easy as saying 'Wonder Woman 1984' is a good or bad movie. 
                The pieces are there, and there are moments I adore, but it does come 
                across as a bit of a mess, even though the action sequences are breathtaking. 
                If you're a fan of the original film, you'll be more willing to take the ride, 
                but for those more indifferent, it may be a bit of a blander sit. If you can 
                and are planning to watch it, the theatrical experience is the way to go - 
                there is nothing like seeing these stunning sets, fun action scenes and hearing Zimmer's
                jaw-dropping score like on the big screen. - Chris dos Santos... read the rest.
              </div>
            </div>
          </Container>
        </div>
      </div>
  </div>
</template>