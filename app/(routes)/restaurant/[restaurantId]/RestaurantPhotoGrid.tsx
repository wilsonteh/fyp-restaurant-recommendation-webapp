"use client";
import Image from "next/image";
import PhotoModal from "./PhotoModal";
import { useState } from "react";
import { Photo } from "@/app/_utils/interfaces/Interfaces";
import { useDisclosure } from "@nextui-org/react";

export default function RestaurantPhotoGrid({ photos }: { photos: Photo[] }) {

  const [photoShown, setPhotoShown] = useState<Photo|null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="px-4">
      <div className="grid grid-cols-5 gap-2">
        {photos.slice(0, 10).map((photo, i) => (
          <div key={i} className="relative aspect-square">
            <Image
              className="rounded-lg absolute inset-0 w-full h-full object-cover cursor-pointer"
              src={photo.url}
              width={500}
              height={200}
              alt="restaurant photo"
              onClick={() => {
                onOpen()
                setPhotoShown(photo);
              }}
            />
          </div>
        ))}
      </div>
      
      { photoShown && (
        <PhotoModal 
          photo={photoShown} 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          /> 
      )}
    </section>
  );
}