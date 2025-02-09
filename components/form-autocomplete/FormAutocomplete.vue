<script setup lang="ts">
  // ** Components
  import { Check } from "lucide-vue-next";

  // ** Helpers
  import { cn } from "@/helpers/utils.helper";

  // ** Hooks
  import { useVModel } from "@vueuse/core";

  // ** Types
  import type { HTMLAttributes, InputHTMLAttributes } from "vue";
  import type { OptionsDT } from "@/commons/types";
  import type { InputVariants } from "@/components/form-input";

  const props = withDefaults(defineProps<{
		class?: HTMLAttributes["class"],
		placeholder?: InputHTMLAttributes["placeholder"],
		disabled?: InputHTMLAttributes["disabled"],
		readonly?: InputHTMLAttributes["readonly"],
		defaultValue?: string,
		modelValue?: string,
		
		iconName?: string,
		iconDirection?: "append" | "prepend",
		iconClass?: HTMLAttributes["class"],
		iconContainerClass?: HTMLAttributes["class"],
		
		noSpace?: boolean,
		noUppercase?: boolean,
		noLetters?: boolean,
		maxlength?: InputHTMLAttributes["maxlength"],
		minlength?: InputHTMLAttributes["minlength"],
		size?: InputVariants["size"],
		variant?: InputVariants["variant"],

    options?: OptionsDT[],
    optionLoading?: boolean,

    minlengthOfSearch?: number,
	}>(), {
    minlengthOfSearch: 3,
  });

  const emits = defineEmits<{
    (e: "update:modelValue", value: string): void;
    (e: "update:options", value: string): void;
    (e: "click:options", value: string): void;
  }>();

  const modelValue = useVModel(props, "modelValue", emits, {
		passive: true,
		defaultValue: props.defaultValue,
	});

  const triggerRef = ref<HTMLElement | null>(null);

  const popoverOpen = ref<boolean>(false);
  const popoverWidth = computed(() => {
    return `${triggerRef.value?.clientWidth}px`;
  });

  const options = ref<OptionsDT[]>([]);

  watch(() => props.options, (value) => {
    options.value = value ?? [];
  });

  const handleInput = (e: InputEvent) => {
    let value = (e.target as HTMLInputElement).value;

    if (value.length >= props.minlengthOfSearch) {
      emits('update:options', value);
      popoverOpen.value = true;
    }
    else {
      if (value.length === 0) options.value = [];
      popoverOpen.value = false;
    }
  }

  const handleClickInput = () => {
    if (
      modelValue.value && 
      modelValue.value.length >= props.minlengthOfSearch &&
      options.value.length > 0
    ) {
      popoverOpen.value = true;
    }
  }

  const handleClickOption = (option: OptionsDT) => {
    emits('click:options', option.value);
    popoverOpen.value = false;
  }
</script>

<template>
  <Popover v-model:open="popoverOpen">
    <PopoverAnchor as-child>
      <div ref="triggerRef">
        <FormInput
          :size="props.size"
          :variant="props.variant" 
          :placeholder="props.placeholder"
          :class="props.class"
          @input="handleInput"
          @click="handleClickInput"
          v-model="modelValue"
        />
      </div>
    </PopoverAnchor>
    <PopoverContent class="h-auto max-h-96 min-w-32 bg-black text-white overflow-y-scroll border-0 rounded-md z-[99] p-0" :style="{ width: popoverWidth }">
      <div v-if="props.optionLoading" class="p-1">
        <div :class="cn('relative flex w-full select-none items-center rounded-sm ' + 
          'py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none ' + 
          'data-[disabled]:opacity-50')">
          Loading..
        </div>
      </div>
      <div v-else class="p-1">
        <template v-if="options.length === 0">
          <span :class="cn('relative flex w-full select-none items-center rounded-sm ' + 
            'py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none ' + 
            'data-[disabled]:opacity-50')">
            No data found
          </span>
        </template>
        <template v-else>
          <div 
            v-for="(option, i) in options" :key="i"
            :class="cn('relative flex w-full select-none items-center rounded-sm text-sm ' + 
              'outline-none py-1.5 pl-2 pr-8 hover:bg-accent hover:text-accent-foreground ' + 
              'data-[disabled]:pointer-events-none data-[disabled]:opacity-50')"
            @click="handleClickOption(option)" 
          >
            <div>{{ option.label }}</div>

            <div :class="cn(modelValue === option.value ? 'visible' : 'invisible', 
              'absolute right-2 flex h-3.5 w-3.5 items-center justify-center')">
              <Check class="h-4 w-4" />
            </div>
          </div>
        </template>
      </div>
    </PopoverContent>
  </Popover>
</template>