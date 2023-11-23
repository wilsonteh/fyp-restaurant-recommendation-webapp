"use client";
import { Card, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import RestaurantsGrid from "./RestaurantsGrid";
import Link from "next/link";

export default function BrowseByCuisineGrid() {
  const cuisines = [
    { label: "Sushi", imageSrc: "/images/sushi.jpeg" },
    { label: "Western", imageSrc: "/images/salmon.jpg" },
    { label: "Indian", imageSrc: "/images/briyani.jpeg" },
    { label: "Nasi Lemak", imageSrc: "/images/nasi lemak.jpg" },
    { label: "Ramen", imageSrc: "/images/ramen.jpg" },
    { label: "Korean", imageSrc: "/images/korean.jpg" },
    { label: "Curry Mee", imageSrc: "/images/curry-mee.jpg" },
    { label: "Thai", imageSrc: "/images/thai.jpg" },
  ];

  return (
    <div className="">
      <h1 className="font-semibold text-2xl mb-4">Browse by cuisines</h1>

      <RestaurantsGrid>
        {cuisines.map((c) => (
          <Card
            key={c.label}
            className="relative h-[200px]"
            isPressable
            as={Link}
            href={`/explore?q=${c.label}`}
          >
            <CardHeader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/60 text-gray-200 rounded-none flex justify-center items-center text-2xl font-medium h-full">
              {c.label}
            </CardHeader>

            <Image
              src={c.imageSrc}
              alt={c.label}
              className="object-cover w-full h-full"
              width={300}
              height={200}
            />
          </Card>
        ))}
      </RestaurantsGrid>
    </div>
  );
}