<script setup lang="ts">
	import { computed } from "vue";
	
	// ** Components
	import { SelectScrollDownButton } from "radix-vue";
	
	// ** Helpers
	import { cn } from "@/helpers/utils.helper";

	// ** Hooks
	import { useForwardProps } from "radix-vue";

	// ** Icons
	import { ChevronDown } from "lucide-vue-next";

	// ** Types
	import type { HTMLAttributes } from "vue";
	import type { SelectScrollDownButtonProps } from "radix-vue";

	const props = defineProps<SelectScrollDownButtonProps & { class?: HTMLAttributes["class"] }>();

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props;

		return delegated;
	});

	const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
	<SelectScrollDownButton v-bind="forwardedProps" :class="cn('flex cursor-default items-center justify-center py-1', props.class)">
		<slot>
			<ChevronDown class="!size-4" />
		</slot>
	</SelectScrollDownButton>
</template>
