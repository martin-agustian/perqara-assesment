import { cva } from "class-variance-authority";

// ** Types
import type { VariantProps } from "class-variance-authority";

export const selectValueVariants = cva("", {
	variants: {
		variant: {
			default: "",
		},
		size: {
      md: "",
		},
	},
	defaultVariants: {
		variant: "default",
    size: "md",
	},
});

export const selectTriggerVariants = cva(
	"h-10 w-full flex items-center justify-between bg-transparent text-sm text-white " + 
	"rounded-md outline-0 px-3 py-2 ring-offset-background file:border-0 " + 
	"file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground " + 
	"disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-[#757575] " +
	"[&>span]:line-clamp-1 [&>svg]:opacity-[0.8] [&>svg]:w-6 [&>svg]:h-6", 
	{
		variants: {
			variant: {
				default: "bg-outer-space text-mercury [&>svg]:text-white",
			},
			size: {
				xs: "h-8 text-[13px] px-1",
				sm: "h-10 md:h-11 text-[14px] px-3",
				md: "h-11 md:h-12 text-[16px] px-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
);

export const selectTriggerIconVariants = cva(
	"opacity-50", 
	{
		variants: {
			variant: {
				default: "text-white",
				secondary: "text-black",
				blank: "",
			},
			size: {
				xs: "!size-4",
				sm: "!size-4",
				md: "!size-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
);

export type SelectValueVariants = VariantProps<typeof selectValueVariants>;
export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;
export type SelectTriggerIconVariants = VariantProps<typeof selectTriggerIconVariants>;

export { default as Select } from "./Select.vue";
export { default as SelectValue } from "./SelectValue.vue";
export { default as SelectTrigger } from "./SelectTrigger.vue";
export { default as SelectContent } from "./SelectContent.vue";
export { default as SelectGroup } from "./SelectGroup.vue";
export { default as SelectItem } from "./SelectItem.vue";
export { default as SelectItemText } from "./SelectItemText.vue";
export { default as SelectLabel } from "./SelectLabel.vue";
export { default as SelectSeparator } from "./SelectSeparator.vue";
export { default as SelectScrollUpButton } from "./SelectScrollUpButton.vue";
export { default as SelectScrollDownButton } from "./SelectScrollDownButton.vue";
