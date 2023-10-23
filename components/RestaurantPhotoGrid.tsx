"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";

interface RestaurantPhotoGridProps {
  photos: {
    url: string;
    width: number;
    height: number;
  }[];
}

export default function RestaurantPhotoGrid({ photos }: RestaurantPhotoGridProps) {

  return (
    <section className="px-4">
      <div className="grid grid-cols-5 gap-2">
        { photos.slice(0, 5).map((photo, i) => (
          <div key={i} className="relative aspect-square">
            <Image
              className="rounded-lg absolute inset-0 w-full h-full object-cover"
              src={photo.url}
              width={500}
              height={200}
              alt="restaurant photo"
              />
          </div>
        ))}
      </div>

      {/* <Button>View All</Button> */}
    </section>
  );
}