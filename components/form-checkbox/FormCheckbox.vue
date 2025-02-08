<script setup lang="ts">
	// ** Helpers
	import { cn } from "@/helpers/utils.helper";
	
	// ** Types
	import type { HTMLAttributes } from "vue";

	const props = defineProps<{
		id?: HTMLAttributes["id"],
		class?: HTMLAttributes["class"],
		classLabel?: HTMLAttributes["class"],
		label?: string,
		defaultValue?: string | number | boolean,
		disabled?: boolean,
	}>();

	const model = defineModel();
</script>

<template>
  <div :class="cn('flex items-center justify-between space-x-2', props.class)">
    <label :for="props.id" :class="cn('text-sm text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer', props.classLabel)">
      {{ props.label }}
    </label>
		<Checkbox :id="props.id" :checked="modelValue" @update:checked="(value) => model = value" :disabled="disabled" />    
  </div>
</template>