<script setup lang="ts">
	// ** Components
	import { SelectValue } from "radix-vue";
  
  // ** Helpers
  import { cn } from "@/helpers/utils.helper";
  
  // ** Types
  import type { InputHTMLAttributes, HTMLAttributes } from "vue";
	import type { SelectValueProps } from "radix-vue";
  import type { SelectValueVariants } from ".";

	// ** Variants
	import { selectValueVariants } from ".";

	const props = defineProps<SelectValueProps & {
		class?: HTMLAttributes["class"],
		placeholder?: InputHTMLAttributes["placeholder"],
		variant?: SelectValueVariants["variant"],
	}>();
</script>

<template>
	<SelectValue v-bind="props" :class="cn(selectValueVariants({ variant: props.variant }), props.class)">
		<slot />
	</SelectValue>
</template>
