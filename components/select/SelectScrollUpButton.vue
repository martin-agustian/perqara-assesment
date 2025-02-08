<script setup lang="ts">
	import { computed } from "vue";
	
	// ** Components
	import { SelectScrollUpButton } from "radix-vue";
	
	// ** Helpers
	import { cn } from "@/helpers/utils.helper";

	// ** Hooks
	import { useForwardProps } from "radix-vue";

	// ** Icons
	import { ChevronUp } from "lucide-vue-next";

	// ** Types
	import type { HTMLAttributes } from "vue";
	import type { SelectScrollUpButtonProps } from "radix-vue";

	const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes["class"] }>();

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props;

		return delegated;
	});

	const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
	<SelectScrollUpButton v-bind="forwardedProps" :class="cn('flex cursor-default items-center justify-center py-1', props.class)">
		<slot>
			<ChevronUp class="!size-4" />
		</slot>
	</SelectScrollUpButton>
</template>
