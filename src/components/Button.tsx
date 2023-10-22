import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const btnStyles = cva(['transition-colors'], {
  variants: {
    size: {
      default: ['rounded', 'p-2'],
      icon: ['rounded-full', 'w-10', 'h-10', 'flex', 'items-center', 'justify-center', 'p-2.5'],
    },
    variant: {
      default: ['bg-secondary', 'hover:bg-secondary-hover'],
      ghost: ['hover:bg-gray-100'],
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

type ButtonProps = VariantProps<typeof btnStyles> & ComponentProps<'button'>;

const Button: FC<ButtonProps> = ({ size, variant, className, children, ...props }) => {
  return (
    <button {...props} className={twMerge(btnStyles({ variant, size }), className)}>
      {children}
    </button>
  );
};

export default Button;
