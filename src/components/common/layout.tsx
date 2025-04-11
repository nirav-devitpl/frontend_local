import * as React from "react";
import { cn } from "@/lib/utils";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  fadedBelow?: boolean;
  fixedHeight?: boolean;
}

function Layout({
  className,
  fadedBelow = false,
  fixedHeight = false,
  ...props
}: React.ComponentProps<"div"> & LayoutProps) {
  return (
    <div
      data-slot="div"
      className={cn(
        "relative flex h-full w-full flex-col",
        fadedBelow &&
          "after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:hidden after:h-32 after:w-full after:bg-[linear-gradient(180deg,_transparent_10%,_hsl(var(--background))_70%)] after:md:block",
        fixedHeight && "md:h-svh",
        className
      )}
      {...props}
    />
  );
}

function LayoutHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="div"
      className={cn(
        "flex h-[var(--header-height)] flex-none items-center gap-4 bg-background p-4 md:px-8",
        className
      )}
      {...props}
    />
  );
}

interface LayoutBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  fixedHeight?: boolean;
}

function LayoutBody({
  className,
  fixedHeight,
  ...props
}: React.ComponentProps<"div"> & LayoutBodyProps) {
  return (
    <div
      data-slot="div"
      className={cn(
        "flex-1 overflow-hidden px-4 py-3",
        fixedHeight && "h-[calc(100%-var(--header-height))]",
        className
      )}
      {...props}
    />
  );
}

export { Layout, LayoutHeader, LayoutBody };
