<script setup lang="ts">
  // ** Helpers
  import { cn } from "@/helpers/utils.helper";

  // ** Hooks
  import { useProvideCarousel } from "./useCarousel";

  // ** Types
  import type { CarouselEmits, CarouselProps, WithClassAsProps } from "./interface";

  const props = withDefaults(defineProps<CarouselProps & WithClassAsProps>(), {
    orientation: "horizontal",
  });

  const emits = defineEmits<CarouselEmits>();

  const carouselArgs = useProvideCarousel(props, emits);

  defineExpose(carouselArgs);

  function onKeyDown(event: KeyboardEvent) {
    const prevKey = props.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const nextKey = props.orientation === "vertical" ? "ArrowDown" : "ArrowRight";

    if (event.key === prevKey) {
      event.preventDefault();
      carouselArgs.scrollPrev();

      return;
    }

    if (event.key === nextKey) {
      event.preventDefault();
      carouselArgs.scrollNext();
    }
  }
</script>

<template>
	<div :class="cn('relative overflow-x-hidden', props.class)" role="region" aria-roledescription="carousel" tabindex="0" @keydown="onKeyDown">
		<slot v-bind="carouselArgs" />
	</div>
</template>
