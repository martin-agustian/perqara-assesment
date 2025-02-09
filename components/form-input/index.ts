import { cva } from "class-variance-authority";

// ** Types
import type { VariantProps } from "class-variance-authority";

export const inputVariants = cva(
	"flex h-10 w-full bg-transparent text-sm " + 
	"rounded-md outline-0 px-3 py-2 ring-offset-background file:border-0 " + 
	"file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground " + 
	"disabled:cursor-not-allowed disabled:opacity-50", 
{
	variants: {
		variant: {
			default: "bg-baltic-sea text-white placeholder:text-[#757575] focus:border-neon-blue hover:border-neon-blue rounded-md"
		},
		size: {
			md: "h-9 text-[14px] px-10",
		},
	},
	defaultVariants: {
		variant: "default",
    size: "md",
	},
});

export const inputIconVariants = cva("absolute top-[50%] translate-y-[-50%]",{
	variants: {
		variant: {
			default: "text-white",
			secondary: "text-black",
			blank: ""
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

export type InputVariants = VariantProps<typeof inputVariants>;
export type InputIconVariants = VariantProps<typeof inputVariants>;

export { default as FormInput } from "./FormInput.vue";
