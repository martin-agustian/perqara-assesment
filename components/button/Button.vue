<script setup lang="ts">
  import { Primitive } from "radix-vue";
  
  // ** Helpers
  import { cn } from "@/helpers/utils.helper";

  // ** Types
  import type { PrimitiveProps } from "radix-vue";
  import type { HTMLAttributes } from "vue";
  import type { ButtonVariants } from ".";

  // ** Variants
  import { buttonVariants } from ".";

  interface Props extends PrimitiveProps {
    variant?: ButtonVariants["variant"],
    size?: ButtonVariants["size"],
    class?: HTMLAttributes["class"],
  }

  const props = withDefaults(defineProps<Props>(), {
    as: "button",
  });
</script>

<template>
	<Primitive :as="as" :as-child="asChild" :class="cn(buttonVariants({ variant: variant, size: size }), props.class)">
		<slot />
	</Primitive>
</template>