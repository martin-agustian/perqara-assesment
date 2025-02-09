<script setup lang="ts">
  import Swal from 'sweetalert2';

  // ** APIs
  import SearchAPI from '@/apis/Search.api';

  // ** Helper
  import { toFullYear } from '@/helpers/utils.helper';

  // ** Icons
  import IconMovie from '@/assets/images/icon-movie.svg';
  import IconSearch from '@/assets/images/icon-search.svg';
  import IconGrid from '@/assets/images/icon-grid.svg';

  // ** Options
  import { genreOptions } from '@/commons/options';

  // ** Types
  import type { OptionsDT } from '@/commons/types';
  import type { SearchMovieRequestDT } from '@/types/requests/Search.request';
  import type { MovieDT } from '@/types/models/Movie.model';

  const loadingQuery = ref<boolean>(false);

  const movieQuery = ref<string>('');
  const movieOptions = ref<OptionsDT[]>([]);

  const movies = ref<MovieDT[]>([]);

  const getMovies = async () => {
    try {
      let params = {} as SearchMovieRequestDT;
      params.query = movieQuery.value;

      const searchAPI = await SearchAPI.Movie(params);

      if (searchAPI.status === 200) {
        const { results } = searchAPI.data;

        movies.value = results;
        movieOptions.value = movies.value.map(movie => ({
          label: `${movie.title} ${movie.release_date ? '('+toFullYear(movie.release_date)+')' : ''}`,
          value: movie.id.toString()
        }))
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
      loadingQuery.value = false;
    }
  }
  
  const handleAutocomplete = (value: string) => {
    loadingQuery.value = true;
    movieQuery.value = value;
    getMovies();
  }

  const handleAutocompleteOption = (value: string) => {
    movieQuery.value = '';
    navigateTo(`/detail/${value}`);
  }
</script>

<template>
  <div class="bg-ebony-clay text-white uppercase p-[15px]">
    <Container class="flex justify-between items-center gap-[35px] !py-0">
      <img src="/public/logo.svg" class="cursor-pointer" @click="navigateTo('/')">

      <div class="relative flex-1">
        <img :src="IconMovie" class="size-[24px] absolute left-[10px] top-[50%] translate-y-[-50%] z-10">
        <FormAutocomplete
          id="input-movie"
          placeholder="Find Movie"
          :options="movieOptions"
          :optionLoading="loadingQuery"
          :modelValue="movieQuery"
          @update:modelValue="handleAutocomplete"
          @click:options="handleAutocompleteOption"
        />
        <img :src="IconSearch" class="size-[16px] absolute right-[10px] top-[50%] translate-y-[-50%] z-10">
      </div>      

      <ul class="flex gap-[25px] text-[13px] font-semibold">
        <Popover>
          <PopoverTrigger as-child>
            <li class="flex gap-[5px] items-center cursor-pointer">
              <img :src="IconGrid" class="size-[20px]"> categories
            </li>
          </PopoverTrigger>
          <PopoverContent class="w-min">
            <div 
              v-for="(genre, i) in genreOptions" :key="i" 
              class="text-[14px] font-medium hover:font-semibold hover:text-carmine-pink cursor-pointer p-2"
            >
              {{ genre.label }}
            </div>
          </PopoverContent>
        </Popover>
        <li class="cursor-pointer" @click="navigateTo('/list-movie')">movies</li>
        <li class="cursor-pointer" @click="navigateTo('/list-tv-show')">tv shows</li>
        <li class="cursor-pointer">login</li>
      </ul>
    </Container>
  </div>
</template>