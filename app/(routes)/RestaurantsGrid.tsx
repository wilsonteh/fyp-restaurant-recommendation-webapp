import React from "react";
import { twMerge } from "tailwind-merge";

export default function RestaurantsGrid({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className={twMerge(
      'grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4', 
      'gap-x-3 gap-y-7 sm:gap-6 px-3 sm:p-0'
    )}>
      { children }
    </div>
  );
}
