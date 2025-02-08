<script setup lang="ts">
	import { computed } from "vue";

	// ** Components
	import { SelectIcon, SelectTrigger } from "radix-vue";
  
  // ** Helpers
  import { cn } from "@/helpers/utils.helper";

	// ** Hooks
	import { useForwardProps } from "radix-vue";
	
	// ** Icons
	import { ChevronDown } from "lucide-vue-next";
  
  // ** Types
  import type { HTMLAttributes } from "vue";
  import type { SelectTriggerVariants, SelectTriggerIconVariants } from ".";
	import type { SelectTriggerProps } from "radix-vue";

	// ** Variants
	import { selectTriggerVariants, selectTriggerIconVariants } from ".";

	const props = defineProps<SelectTriggerProps & {
		variant?: SelectTriggerVariants["variant"],
		variantChevronDown?: SelectTriggerIconVariants["variant"],
		size?: SelectTriggerVariants["size"],
		sizeChevronDown?: SelectTriggerIconVariants["size"],
		class?: HTMLAttributes["class"],
		isNoIcon?: boolean,
	}>();

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props;

		return delegated;
	});

	const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
	<SelectTrigger v-bind="forwardedProps" :class="cn(selectTriggerVariants({ variant: variant, size: size }), props.class)">
		<slot />
		<SelectIcon v-if="!isNoIcon" as-child>
			<ChevronDown :class="cn(selectTriggerIconVariants({ variant: variant, size: size }))" />
		</SelectIcon>
	</SelectTrigger>
</template>
