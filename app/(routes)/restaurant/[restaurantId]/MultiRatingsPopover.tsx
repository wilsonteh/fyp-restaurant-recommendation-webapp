"use client";
import { Rating } from "@/app/_utils/interfaces/Interfaces";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { ItemStyles, Rating as StarRating } from "@smastrom/react-rating";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

export default function MultiRatingsPopover({
  rating, 
  ratingStyles, 
} : {
  rating: Rating;
  ratingStyles: ItemStyles;
}) {

  const { theme } = useTheme();
  const ratings = [
    { name: 'food', value: rating.food }, 
    { name: 'service', value: rating.service }, 
    { name: 'value for money', value: rating.value }, 
    { name: 'atmosphere', value: rating.atmosphere }, 
  ]

  return (
    <Popover className="p-4 text-xs">
      <PopoverTrigger>
        <Button
          color="secondary"
          variant="light"
          size="md"
          disableRipple
          className="w-fit font-medium p-2 min-w-0"
        >
          Detail
        </Button>
      </PopoverTrigger>

      <PopoverContent className={twMerge(
        'flex flex-col items-start justify-center gap-2 px-4 py-3',
        theme === 'dark' ? 'bg-slate-800' : 'bg-white'
      )}>
        {ratings.map((rating) => (
          <div
            key={rating.name}
            className="w-full flex flex-row justify-between gap-4 capitalize"
          >
            <h4 className=""> {rating.name} </h4>

            <StarRating
              value={rating.value}
              style={{ maxWidth: 80 }}
              itemStyles={ratingStyles}
              readOnly
            />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
 
