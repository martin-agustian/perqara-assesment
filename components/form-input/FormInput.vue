<script setup lang="ts">
	// ** Helpers
	import { cn } from "@/helpers/utils.helper";
	import { setLetterClear, setSpaceClear } from "@/helpers/utils.helper";
	
	// ** Hooks
	import { useVModel } from "@vueuse/core";

	// ** Types
	import type { InputHTMLAttributes, HTMLAttributes } from "vue";
	import type { InputVariants } from ".";

	// ** Variants
	import { inputVariants, inputIconVariants } from ".";

	const props = withDefaults(defineProps<{
		class?: HTMLAttributes["class"],
		placeholder?: InputHTMLAttributes["placeholder"],
		disabled?: InputHTMLAttributes["disabled"],
		readonly?: InputHTMLAttributes["readonly"],
		defaultValue?: string | number,
		modelValue?: string | number,
		
		iconName?: string,
		iconDirection?: "append" | "prepend",
		iconClass?: HTMLAttributes["class"],
		iconContainerClass?: HTMLAttributes["class"],

		appendCheck?: boolean,
		appendCheckText?: string,
		appendCheckLoading?: boolean,
		appendCheckMinChars?: number,
		appendCheckDisabled?: boolean,
		appendCheckClass?: HTMLAttributes["class"],
		appendCheckContainerClass?: HTMLAttributes["class"],

		appendTogglePassword?: boolean,
		appendTogglePasswordClass?: HTMLAttributes["class"],
		appendTogglePasswordContainerClass?: HTMLAttributes["class"],
		
		noSpace?: boolean,
		noUppercase?: boolean,
		noLetters?: boolean,
		type?: InputHTMLAttributes["type"],
		accept?: InputHTMLAttributes["accept"],
		maxlength?: InputHTMLAttributes["maxlength"],
		minlength?: InputHTMLAttributes["minlength"],
		size?: InputVariants["size"],
		variant?: InputVariants["variant"],
	}>(), {
		appendCheckMinChars: 1,
		appendCheckDisabled: false,
	});

	const emits = defineEmits<{
		(e: "click:check"): void;
		(e: "update:modelValue", value: string | number): void;
		(e: "update:modelAppendCheckDisabled", value: boolean): void;
	}>();

	const modelValue = useVModel(props, "modelValue", emits, {
		passive: true,
		defaultValue: props.defaultValue,
	});

	const inputType = ref(props.type);

	const isInputAppendCheck = computed(() => {
		return props.appendCheck && !props.appendTogglePassword && !props.iconName && (props.type === 'text' || props.type === 'number');
	});
	const isInputAppendTogglePassword = computed(() => {
		return !props.appendCheck && props.appendTogglePassword && !props.iconName && props.type === 'password';
	});
	const isInputIcon = computed(() => {
		return !props.appendCheck && !props.appendTogglePassword && props.iconName && (props.type === 'text' || !props.type);
	});

	const appendCheckDisabled = ref(props.appendCheckDisabled || props.appendCheckMinChars > 0 ? true : false);

	onMounted(() => {
		handleDisableAppendCheck(modelValue.value as string ?? '');
	});

	const handleInput = (event: Event) => {
		let value = (event.target as HTMLInputElement).value;

		// btn check disabled
		handleDisableAppendCheck(value);

		// input no space
		if (modelValue.value && props.noSpace) {
			modelValue.value = setSpaceClear(modelValue.value as string);			
		}

		// input no uppercase
		if (modelValue.value && props.noUppercase) {
			modelValue.value = (modelValue.value as string).toLowerCase();
		}

		// input no letters (number only)
		if (modelValue.value && props.noLetters) {
			modelValue.value = setLetterClear(modelValue.value as string);
		}
	};

	const handleDisableAppendCheck = (value: string) => {
		let { appendCheckMinChars } = props;
		
		if (appendCheckMinChars == 0) {
			appendCheckDisabled.value = false;
		}
		else {
			if (appendCheckMinChars && value.length < appendCheckMinChars) {
				appendCheckDisabled.value = true;
			}
			else {
				if (value) appendCheckDisabled.value = false;
				else appendCheckDisabled.value = true;
			}
		}
	};

	const handleCheckOnClick = () => {
		if (!appendCheckDisabled.value) emits("click:check");
	};
</script>

<template>
	<div class="relative">
		<input
			:type="inputType" 
			:placeholder="props.placeholder" 
			:accept="props.accept" 
			:maxlength="props.maxlength" 
			:minlength="props.minlength" 
			:readonly="props.readonly" 
			:disabled="props.disabled ?? false"
			:class="cn(
				inputVariants({ variant: variant, size: size }),
				props.class,
				props.appendCheck && 'pr-24',
				props.appendTogglePassword && 'pr-12',
				props.iconName && props.iconDirection === 'prepend' && 'pl-12', 
				props.iconName && props.iconDirection === 'append' && 'pr-12'
			)"
			v-model="modelValue" 
			@input="handleInput"
		/>

		<span v-if="isInputAppendCheck" :class="cn('absolute end-0 inset-y-0 flex items-center justify-center cursor-pointer px-5', props.appendCheckContainerClass)">
			<Button variant="blank" size="blank" :class="cn('text-[14px] bg-persian-blue text-white px-2 py-[2px] rounded-md', props.appendCheckClass)" :disabled="props.appendCheckDisabled || appendCheckDisabled" @click="handleCheckOnClick">
				{{ appendCheckLoading ? 'Loading..' : props.appendCheckText ? props.appendCheckText : 'Check' }}
			</Button>
		</span>

		<span v-if="isInputAppendTogglePassword" :class="cn(inputIconVariants({ variant: variant, size: size }), 'right-[20px]', props.appendTogglePasswordContainerClass)">
			<Icon :name="inputType == 'password' ? 'tabler:eye-off' : 'tabler:eye'" :class="cn('size-[25px] cursor-pointer', props.appendTogglePasswordClass)" @click="inputType = (inputType == 'password' ? 'text' : 'password')" />
		</span>
		
		<span v-if="isInputIcon" :class="cn(inputIconVariants({ variant: variant, size: size }), props.iconDirection === 'prepend' ? 'left-[18px]' : 'right-[20px]', props.iconContainerClass)">
			<Icon :name="props.iconName ?? ''" :class="cn('size-[25px]', props.iconClass)" />
		</span>
	</div>
</template>
