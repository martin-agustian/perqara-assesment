import { cva } from "class-variance-authority";

// ** Types
import type { VariantProps } from "class-variance-authority";

export const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
	variants: {
		variant: {
			default: "bg-persian-blue text-white hover:bg-royal",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline: "border border-black bg-background hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			olsoGrey: "bg-olso-grey text-white hover:bg-olso-grey/80",
			tertiary: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
			blank: "",
		},
		size: {
			'default': "h-10 md:h-11 text-[16px] md:text-[18px] rounded-[12px] px-16",
			'2xs': "h-7 text-[12px] md:text-[14px] rounded px-2",
			'xs': "h-8 md:h-9 text-[12px] md:text-[14px] rounded-sm px-3",
			'sm': "h-9 md:h-10 text-[14px] md:text-[16px] rounded-md px-3",
			'lg': "h-11 md:h-12 text-[16px] md:text-[18px] rounded-md px-8",
			'icon': "h-10 w-10",
			'blank': "",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export { default as Button } from "./Button.vue";
