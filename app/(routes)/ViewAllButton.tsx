"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function ViewAllButton(params?: any) {

  return (
    <Link
      className="self-end"
      href={{
        pathname: "/restaurants/popular",
        query: {
          ...params,
        },
      }}
    >
      <Button color="secondary" variant="shadow">
        View All
      </Button>
    </Link>
  );
}