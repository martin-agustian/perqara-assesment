<script setup lang="ts">
  import { cn } from "@/helpers/utils.helper";

  // ** Types
  import type { HTMLAttributes } from "vue";
  import type { CapsuleVariants } from ".";

  // ** Variants
  import { capsuleVariants } from ".";

  const props = defineProps<{
    class?: HTMLAttributes["class"],
    variant?: CapsuleVariants["variant"],
  }>();
</script>

<template>
  <div :class="cn(capsuleVariants({ variant }), props.class)">
    <slot />
  </div>
</template>