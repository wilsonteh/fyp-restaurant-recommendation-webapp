import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { SelectedRestaurant } from "@/app/_utils/interfaces/Interfaces";

interface SelectedPlaceProps {
  place: SelectedRestaurant;
}

const SelectedRestaurant = ({ place }: SelectedPlaceProps) => {

  console.log("🚀 ~ file: SelectedPlace.tsx:31 ~ SelectedPlace ~ place:", place);
  console.log(place.photos[0].getUrl());

  return (
    <Card
      as={Link}
      href={`/restaurant/${place.place_id}`}
      isHoverable={true}
      isPressable={true}
      classNames={{
        base: [
          "flex flex-col w-[300px] mx-auto p-4 border-1 border-transparent", 
          "data-[hover]:bg-light/80 data-[hover]:border-dark/30",
        ], 
      }}
      >
      <CardBody className="p-0 mb-4">
        <h1 className="font-medium">{place.name}</h1>
        <p className="text-xs">{place.formatted_address}</p>
      </CardBody>

      <CardBody className="min-h-[200px]">
        <Image 
          src={place.photos[0].getUrl()} 
          fill={true} 
          className="rounded-lg"
          alt={place.name} 
          />
      </CardBody>

    </Card>
  );
};

export default SelectedRestaurant;
