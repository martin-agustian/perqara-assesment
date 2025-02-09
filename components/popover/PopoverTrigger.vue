<script setup lang="ts">
  // ** Components
  import { PopoverTrigger } from "radix-vue";

  // ** Types
  import type { PopoverTriggerProps } from "radix-vue";

  const props = defineProps<PopoverTriggerProps>();
</script>

<template>
	<PopoverTrigger v-bind="props">
		<slot />
	</PopoverTrigger>
</template>
