<script setup lang="ts">
  // ** Helpers
  import { toFullPathImage, toFullYear, toRoundedRating } from '@/helpers/utils.helper';

  const props = defineProps<{
    id: number
    title: string
    posterPath: string
    releaseDate: string
    voteAverage: number
  }>();

</script>

<template>
  <div class="w-full">
    <div class="w-full relative inline-block bg-black cursor-pointer" @click="navigateTo(`/detail/${props.id}`)">
      <div class="text-[18px] font-semibold bg-black/50 absolute right-0 p-2">
        {{ toRoundedRating(props.voteAverage) }}
      </div>
      <img v-if="props.posterPath" :src="toFullPathImage(props.posterPath)" class="h-[296px] w-full object-center">
      <img v-else src="/public/the-movie-db-logo.svg" class="h-[296px] w-full object-center p-4">
    </div>
    <div class="text-[16px] font-semibold cursor-pointer hover:text-carmine-pink" @click="navigateTo(`/detail/${props.id}`)">
      {{ props.title }}
    </div>
    <div class="text-[14px] text-olso-grey">
      {{ props.releaseDate ? toFullYear(props.releaseDate) : '-' }}
    </div>
  </div>
</template>