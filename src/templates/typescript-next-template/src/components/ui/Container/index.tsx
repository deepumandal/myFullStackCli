import { Slot } from "@radix-ui/react-slot";
import { forwardRef, JSX } from "react";
import { AnyType } from "@AppTypes/AnyType";
import { cn } from "@Utils/ClassName";
import { CommonProps } from "@Config/ui/asElement";

type ContainerProps = Omit<CommonProps<"container">, "BackgroundColor"> & {
  ScreenType: "container" | "full-screen";
  fullHeight?: boolean;
  asChild?: boolean;
};

const Container = forwardRef<AnyType, ContainerProps>(
  (
    {
      children,
      asElement: Element = "main",
      className,
      role,
      ScreenType = "container",
      border,
      asChild,
      fullHeight,
      ...rest
    }: ContainerProps,
    ref
  ): JSX.Element => {
    const Comp = asChild ? Slot : Element;

    return (
      <Comp
        ref={ref}
        className={cn(
          "base-container",
          ScreenType == "container" ? "container" : "w-full",
          border && "app-border",
          fullHeight ? "full-height" : "",
          className
        )}
        role={role}
        {...rest}
      >
        {children}
      </Comp>
    );
  }
);

Container.displayName = "Container";

export { type ContainerProps, Container };
