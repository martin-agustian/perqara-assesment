<script setup lang="ts">
  import { computed } from "vue";  

  // ** Components
  import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "radix-vue";

  // ** Helpers
  import { cn } from "@/helpers/utils.helper";

  // ** Icons
  import { Check } from "lucide-vue-next";

  // ** Types
  import type { HTMLAttributes } from "vue";
  import type { CheckboxRootEmits, CheckboxRootProps } from "radix-vue";

  const props = defineProps<CheckboxRootProps & { 
    class?: HTMLAttributes["class"] 
  }>();
  const emits = defineEmits<CheckboxRootEmits>();

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });

  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<CheckboxRoot v-bind="forwarded" :class="cn('peer h-4 w-4 shrink-0 bg-river-bed border border-white rounded-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-carmine-pink data-[state=checked]:text-white', props.class)">
		<CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
			<slot>
				<Check class="h-4 w-4" />
			</slot>
		</CheckboxIndicator>
	</CheckboxRoot>
</template>
