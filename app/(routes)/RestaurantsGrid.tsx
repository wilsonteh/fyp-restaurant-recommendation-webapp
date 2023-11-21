import React from "react";

export default function RestaurantsGrid({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      { children }
    </div>
  );
}
