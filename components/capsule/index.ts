import { cva, type VariantProps } from "class-variance-authority";

export const capsuleVariants = cva("inline-flex items-center h-[30px] text-[13px] font-semibold rounded-full cursor-pointer px-4", {
	variants: {
		variant: {
			primary: "text-white bg-artyclick-red",
			secondary: "text-white bg-dark",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

export type CapsuleVariants = VariantProps<typeof capsuleVariants>;

export { default as Capsule } from "./Capsule.vue";