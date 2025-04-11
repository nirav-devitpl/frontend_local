import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 text-inherit",
        outline:
          "border border-primary bg-background shadow-xs hover:bg-accent hover:text-accent-foreground text-primary",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 text-inherit",
        accent:
          "bg-accent text-accent-foreground shadow hover:bg-primary hover:text-white ",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground text-inherit",
        link: "text-primary underline-offset-4 hover:underline text-inherit",
        filter:
          "w-[120px] h-[36px] gap-2 rounded-md border p-2 border-gray-200 bg-white",
        action: "rounded-full",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        xs: "h-7 rounded-md px-1 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
        action: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftSection?: React.JSX.Element;
  rightSection?: React.JSX.Element;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  disabled,
  loading = false,
  leftSection,
  rightSection,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> &
  ButtonProps & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading || disabled}
      {...props}
    >
      {((leftSection && loading) ||
        (!leftSection && !rightSection && loading)) && (
        <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {!loading && leftSection && <div className="mr-2">{leftSection}</div>}
      {children}
      {!loading && rightSection && <div className="ml-2">{rightSection}</div>}
      {rightSection && loading && (
        <IconLoader2 className="ml-2 h-4 w-4 animate-spin" />
      )}
    </Comp>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
