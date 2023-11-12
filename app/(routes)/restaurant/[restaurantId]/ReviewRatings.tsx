"use client";

import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";

export default function MultiRatings({
  rating, 
} : {
  rating: {
    main: number; food: number; service: number; value: number; atmosphere: number;
  }
}) {

  const ratings = [
    { name: 'food', value: 4.4 },
    { name: 'service', value: 4.1 },
    { name: 'value for money', value: 3.7 },
    { name: 'atmosphere', value: 3.89 },
  ]

  return (
    <Popover defaultOpen={true} className="p-4 text-xs">
      <PopoverTrigger>
        <Button
          color="secondary"
          variant="light"
          size="sm"
          disableRipple
          className="w-fit font-medium"
        >
          More
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col items-start justify-center gap-2">
        {ratings.map((rating) => (
          <div
            key={rating.name}
            className="w-full flex flex-row justify-between gap-4 capitalize"
          >
            <h4 className=""> {rating.name} </h4>
            <Rating value={rating.value} style={{ maxWidth: 80 }} readOnly />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
 
