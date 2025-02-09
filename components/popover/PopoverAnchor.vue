<script setup lang="ts">
  // ** Components
  import { PopoverAnchor } from "radix-vue";

  // ** Types
  import type { PopoverAnchorProps } from "radix-vue";

  const props = defineProps<PopoverAnchorProps>();
</script>

<template>
	<PopoverAnchor v-bind="props">
		<slot />
	</PopoverAnchor>
</template>
