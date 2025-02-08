<script setup lang="ts">
	// ** Components
	import { SelectRoot } from "radix-vue";

	// ** Hooks
	import { useForwardPropsEmits } from "radix-vue";

	// ** Types
	import type { SelectRootEmits, SelectRootProps } from "radix-vue";

	const props = defineProps<SelectRootProps>();
	const emits = defineEmits<SelectRootEmits>();

	const forwarded = useForwardPropsEmits(props, emits);	
</script>

<template>
	<SelectRoot v-bind="forwarded">
		<slot />
	</SelectRoot>
</template>
