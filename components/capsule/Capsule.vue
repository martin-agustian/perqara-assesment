<script setup lang="ts">
  import { twMerge } from 'tailwind-merge';

  // ** Types
  import type { HTMLAttributes } from 'vue';
  import type { CapsuleVariants } from '.';

  // ** Variants
  import { capsuleVariants } from '.';

  const props = defineProps<{
    class?: HTMLAttributes["class"],
    variant?: CapsuleVariants["variant"],
  }>();
</script>

<template>
  <div :class="twMerge(capsuleVariants({ variant }), props.class)">
    <slot />
  </div>
</template>