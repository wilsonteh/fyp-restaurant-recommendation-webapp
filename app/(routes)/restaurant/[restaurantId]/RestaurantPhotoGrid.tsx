"use client";
import Image from "next/image";
import PhotoModal from "./PhotoModal";
import { useEffect, useState } from "react";
import { Photo } from "@/app/_utils/interfaces/Interfaces";
import { useDisclosure } from "@nextui-org/react";
import useMyMediaQuery from "@/app/_hooks/useMyMediaQuery";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

export default function RestaurantPhotoGrid({ photos }: { photos: Photo[] }) {

  const { theme, setTheme } = useTheme();
  const [photoShown, setPhotoShown] = useState<Photo|null>(null);
  const [nthPhoto, setNthPhoto] = useState(photos.length);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { xxlScreen, xlScreen, lgScreen, mdScreen, smScreen, xsScreen } = useMyMediaQuery();
  
  useEffect(() => {
    if (xlScreen) setNthPhoto(10);
    else if (lgScreen) setNthPhoto(9);
    else if (mdScreen) setNthPhoto(6);
    else if (smScreen) setNthPhoto(4);
    else if (xsScreen) setNthPhoto(1);
    
  }, [xlScreen, lgScreen,   mdScreen, smScreen, xsScreen])
  
  return (
    <section className="px-4">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {photos.slice(0, nthPhoto).map((photo, i) => (
          <div key={i} className={twMerge(
            'relative aspect-square rounded-lg shadow-lg hover:border-2 hover:scale-95',
            theme === "dark" ? "shadow-slate-700" : "shadow-slate-300",
            theme === "dark" ? "hover:border-primary-400" : "hover:border-primary-600"
          )}>
            <Image
              className='rounded-lg absolute inset-0 w-full h-full object-cover cursor-pointer'
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