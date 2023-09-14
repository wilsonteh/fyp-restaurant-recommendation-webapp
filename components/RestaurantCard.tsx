"use client";
import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import NextImage from "next/image";
import StarIcon from "./icons/StarIcon";
import DoorIcon from "./icons/DoorIcon";
import HeartIcon from "./icons/HeartIcon";

interface RestaurantCardProps {
  
}
 
const RestaurantCard = () => {
  let cardWidth = 300;

  return (
    <Card isPressable className={`w-[${cardWidth}px] shadow-lg`}>
      <CardBody className="p-0">
        <Image 
          as={NextImage}
          src="https://lh3.googleusercontent.com/p/AF1QipMNChxwXUq9YYW4L6LjhtRKMjUV1m57N_2RlCFf=s1360-w1360-h1020"
          width={cardWidth}
          height={200}
          alt="image"
          classNames={{
            img: "rounded-none w-full h-full object-cover", 
            wrapper: `w-[${cardWidth}px] h-[200px]`
          }}
          /> 
      </CardBody>

      <CardBody className="flex flex-row px-3 py-4">
        <div className="w-8/12">
          <h1 className="text-sm font-semibold">Restaurant Name</h1>
          <div className="text-xs">SS15, Subang Jaya</div>
        </div>

        <div className="w-4/12 text-xs flex flex-col items-start justify-center">
          <span className="flex items-center gap-1"> 
            <StarIcon className="w-3 h-3" fill="orange" /> 
            <span>3.9 (583)</span>
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <DoorIcon open={true} className="w-3 h-3" fill="green" />
            <span>Open Now</span>
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
 
export default RestaurantCard;