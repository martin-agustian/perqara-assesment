<script setup lang="ts">
  const autcomplete = defineModel<string>('');
</script>

<template>
  <div class="bg-ebony-clay text-white uppercase p-[15px]">
    <Container class="flex justify-between items-center gap-[35px] !py-0">
      <img src="../../public/logo.svg" class="cursor-pointer" @click="navigateTo('/')">

      <div class="relative flex-1">
        <img src="../../public/icon-movie.svg" class="size-[24px] absolute left-[10px] top-[50%] translate-y-[-50%] z-10">
        <FormAutocomplete
          placeholder="Find Movie"
          :options="[]"
          :optionLoading="false"
          v-model="autcomplete"
        />
        <img src="../../public/icon-search.svg" class="size-[16px] absolute right-[10px] top-[50%] translate-y-[-50%] z-10">
      </div>      

      <ul class="flex gap-[25px] text-[13px] font-semibold">
        <li class="flex gap-[5px] items-center cursor-pointer">
          <img src="../../public/icon-grid.svg" class="size-[20px]"> categories
        </li>
        <li class="cursor-pointer" @click="navigateTo('/list-movie')">movies</li>
        <li class="cursor-pointer" @click="navigateTo('/list-tv-show')">tv shows</li>
        <li class="cursor-pointer">login</li>
      </ul>
    </Container>
  </div>
</template>