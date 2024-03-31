import * as React from "react";

import { cn } from "@/lib/utils";

const CaptionInput = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <textarea
      type={type}
      className={cn(
        "flex h-10 w-full bg-background focus:outline-none dark:text-white text-black py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
CaptionInput.displayName = "CaptionInput";

export { CaptionInput };
