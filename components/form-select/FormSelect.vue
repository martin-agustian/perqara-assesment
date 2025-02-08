<script setup lang="ts">
  import { useVModel } from "@vueuse/core";
  
  // ** Helpers
  import { cn } from "@/helpers/utils.helper";

  // ** Icons
  import { X, ChevronDown } from "lucide-vue-next";

  // ** Types
  import type { HTMLAttributes, InputHTMLAttributes } from "vue";
  import type { OptionsDT } from "@/commons/types";

  // ** Variant Types
  import type { SelectTriggerVariants } from "../select";

  // ** Variants
  import { selectTriggerIconVariants } from "../select";
  
  const props = defineProps<{
    class?: HTMLAttributes["class"],
    classTrigger?: HTMLAttributes["class"],
    defaultValue?: string,
		modelValue?: string,
    placeholder?: InputHTMLAttributes["placeholder"],
    triggerVariant?: SelectTriggerVariants["variant"],
		triggerSize?: SelectTriggerVariants["size"],
    data?: OptionsDT[],
    disabled?: boolean,
    isClearable?: boolean,
  }>();

  const emits = defineEmits<{
    (e: "click:clear"): void;
		(e: "update:modelValue", value: string): void;
	}>();

  const modelValue = useVModel(props, "modelValue", emits, {
		passive: true,
		defaultValue: props.defaultValue,
	});
</script>

<template>
  <Select v-model="modelValue" :disabled="disabled">
    <div :class="cn('relative', props.class)">
      <SelectTrigger 
        :size="triggerSize" :sizeChevronDown="triggerSize" 
        :variant="triggerVariant" :variantChevronDown="triggerVariant" 
        :class="props.classTrigger" isNoIcon
      >
        <div :class="cn('absolute inset-x-0 truncate text-left px-5 pr-7', triggerSize == 'sm' && 'px-3 pr-7')">
          <SelectValue :placeholder="props.placeholder" />      
        </div>
      </SelectTrigger>
      
      <div :class="cn('absolute top-1/2 -translate-y-1/2 right-0 px-5', triggerSize == 'sm' && 'px-3')">
        <X v-if="isClearable && modelValue != ''" 
          :class="cn('cursor-pointer', selectTriggerIconVariants({ variant: triggerVariant, size: triggerSize }))" 
          @click="emits('click:clear')" 
        />

        <ChevronDown v-else 
          :class="cn(selectTriggerIconVariants({ variant: triggerVariant, size: triggerSize }))" 
        />
      </div>
    </div>

    <SelectContent>
      <SelectItem v-for="(x, i) in data" :key="i" :value="x.value">
        {{ x.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>