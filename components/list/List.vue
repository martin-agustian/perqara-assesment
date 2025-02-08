<script setup lang="ts">
  // ** Types
  import type { OptionsDT } from "@/commons/types";

  const props = defineProps<{
    loading: boolean
    title: string
    sortOptions: OptionsDT[]
    genreOptions: OptionsDT[]
  }>();

  const emits = defineEmits<{
    (e: "update:genre", value: string[]): void;
		(e: "update:sort", value: string): void;
	}>();

  const genreFilter = ref<string[]>([]);

  const handleSort = (value: string) => {
    emits("update:sort", value);
  }

  const handleGenre = (option: OptionsDT, isChecked: Boolean) => {
    if (isChecked) {
      genreFilter.value.push(option.value);
    }
    else {
      genreFilter.value = genreFilter.value.filter(item => item !== option.value);
    }

    emits("update:genre", genreFilter.value);
  }
</script>

<template>
	<div>
		<div class="relative">
			<div class="h-[250px] w-full bg-ebony-clay absolute top-[-30px] z-[-1]" />

      <Container>
        <TitleHead class="uppercase text-[36px] mb-8">{{ props.title }}</TitleHead>

        <div class="grid grid-cols-4 gap-6">
          <div class="bg-mirage rounded-md h-max">
            <div class="font-semibold px-4 py-3">
              Sort Result By
            </div>
            <div class="border-t border-white/20 p-4 pb-7">
              <FormSelect
                id="sorting"
                placeholder="Select Sorting" 
                :data="props.sortOptions"
                trigger-size="xs"
                @update:model-value="handleSort"
              />              
            </div>
            <div class="font-semibold border-t border-white/20 px-4 py-3">
              Genres
            </div>
            <div class="flex flex-col gap-y-5 border-t border-white/20 p-4">
              <FormCheckbox
                v-for="(option, i) in props.genreOptions" :key="i"
                :id="option.value"
                :label="option.label"
                @update:model-value="(isChecked) => handleGenre(option, isChecked)"
              />
            </div>
          </div>

          <div class="col-span-3">
            <div v-if="props.loading" class="py-40">
              <Loading />
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <slot />
              <Capsule>Load More</Capsule>
            </div>
          </div>
        </div>
      </Container>
		</div>
	</div>
</template>
