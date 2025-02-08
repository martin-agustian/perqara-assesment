<script setup lang="ts">
  // ** Helpers
  import { fullPathImage, fullYear, roundedRating } from '@/helpers/utils.helper';

  // ** Types  
  import type { MovieDT } from '@/types/models/Movie.model';
  import type { TvShowDT } from '@/types/models/TvShow.model';

  const props = defineProps<{
    title: string
    posterPath: string
    releaseDate: string
    voteAverage: number
  }>();

</script>

<template>
  <div class="w-full">
    <div class="w-full relative inline-block bg-black cursor-pointer">
      <div class="text-[18px] font-semibold bg-black/50 absolute right-0 p-2">
        {{ roundedRating(props.voteAverage) }}
      </div>
      <img v-if="props.posterPath" :src="fullPathImage(props.posterPath)" class="h-[296px] w-full object-center">
      <img v-else src="/public/the-movie-db-logo.svg" class="h-[296px] w-full object-center p-4">
    </div>
    <div class="text-[16px] font-semibold cursor-pointer mt-3">
      {{ props.title }}
    </div>
    <div class="text-[14px] text-olso-grey">
      {{ props.releaseDate ? fullYear(props.releaseDate) : '-' }}
    </div>
  </div>
</template>