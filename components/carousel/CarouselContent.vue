<script setup lang="ts">
  // ** Helpers
  import { cn } from "@/helpers/utils.helper";

  // ** Hooks
  import { useCarousel } from "./useCarousel";
  
  // ** Types
  import type { WithClassAsProps } from "./interface";

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps<WithClassAsProps>();

  const { carouselRef, orientation } = useCarousel();
</script>

<template>
	<div ref="carouselRef">
		<div :class="cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', props.class)" v-bind="$attrs">
			<slot />
		</div>
	</div>
</template>
