<script setup lang="ts">
  // ** Helpers
  import { cn } from "@/helpers/utils.helper";

  // ** Hooks
  import { useCarousel } from "./useCarousel";
  
  // ** Components
  import { ArrowLeft } from "lucide-vue-next";
  import { Button } from "@/components/button";
  
  // ** Types
  import type { WithClassAsProps } from "./interface";

  const props = defineProps<WithClassAsProps>();

  const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
	<Button :disabled="!canScrollPrev" :class="cn('touch-manipulation absolute h-8 w-8 rounded-full p-0', orientation === 'horizontal' ? '-left-12 top-1/2 -translate-y-1/2' : '-top-12 left-1/2 -translate-x-1/2 rotate-90', props.class)" variant="tertiary" @click="scrollPrev">
		<slot>
			<ArrowLeft class="h-4 w-4 text-current" />
			<span class="sr-only">Previous Slide</span>
		</slot>
	</Button>
</template>
