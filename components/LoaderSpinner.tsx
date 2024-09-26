import React from "react";
import { Loader, Loader2Icon } from "lucide-react";

const LoaderSpinner = () => {
  return (
    <div className="flex items-center">
      <Loader2Icon className="animate-spin text-zinc-300" size={30} />
    </div>
  );
};

export default LoaderSpinner;
