<script setup lang="ts">
  // ** Helpers
  import { fullPathImage, fullYear, roundedRating } from '@/helpers/utils.helper';

  // ** Types  
  import type { MovieDT } from '@/types/models/Movie.model';

  const props = defineProps<{
    movie: MovieDT
  }>();
</script>

<template>
  <div class="w-full">
    <div class="w-full relative inline-block cursor-pointer">
      <div class="text-[18px] font-semibold bg-black/50 absolute right-0 p-2">
        {{ roundedRating(props.movie.vote_average) }}
      </div>
      <img :src="fullPathImage(props.movie.poster_path)" class="w-full">
    </div>
    <div class="text-[16px] font-semibold cursor-pointer mt-3">
      {{ props.movie.title }}
    </div>
    <div class="text-[14px] text-olso-grey">
      {{ fullYear(props.movie.release_date) }}
    </div>
  </div>
</template>