import { HTMLAttributes } from "react";
import { cn } from "@Utils/ClassName";

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("skeleton", className)} {...props} />
);

export { Skeleton };
