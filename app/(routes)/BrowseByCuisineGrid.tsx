"use client";
import { Card, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import RestaurantsGrid from "./RestaurantsGrid";
import Link from "next/link";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

export default function BrowseByCuisineGrid() {
  const { theme } = useTheme();

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
    <section className="mb-12">
      <h1 className="font-semibold text-2xl mb-4 capitalize">Browse by cuisines</h1>

      <RestaurantsGrid>
        {cuisines.map((c) => (
          <Card
            key={c.label}
            className={twMerge(
              "relative h-[120px] xs:h-[200px] shadow-lg transition-transform duration-100 delay-100", 
              "hover:scale-105 hover:border-2 hover:border-primary-500",
              theme === "dark" ? "shadow-slate-500/30" : "shadow-slate-500",
              theme === "dark" ? "hover:border-primary-400" : "hover:border-primary-600"
            )}
            isPressable
            as={Link}
            href={`/explore?q=${c.label}`}
          >
            <CardHeader className={twMerge(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/60 text-gray-200 rounded-none flex justify-center items-center text-lg xs:text-2xl font-medium h-full", 
              "hover:text-primary-500"
            )}>
              <span className="flex justify-center items-center">{c.label}</span>
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
    </section>
  );
}