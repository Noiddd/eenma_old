import { cn } from "@/lib/utils";
import * as React from "react";

const Skeleton = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
      ref={ref}
    />
  );
});

export { Skeleton };
