"use client";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { Rating as StarRating } from "react-simple-star-rating";
import DropDownInputs from "./DropDownInputs";
import Star from "@/app/_icons/star";

export default function ReviewForm() {
  const { restaurantId } = useParams();

  return (
    <form action="" className="border-2 px-6 py-4 flex flex-col gap-4">
      <h1 className="font-medium text-lg text-center">
        Submit review for RATA Restaurant @ SS15 Subang Jaya
      </h1>

      <div className="flex flex-col gap-4">
        <label htmlFor="">Rate the restaurant</label>
        <div className="flex gap-2">
          <StarRating
            initialValue={0}
            size={50}
            transition={true}
            SVGclassName="inline-block px-[6px]"
            SVGstrokeColor="#fb923c"
            SVGstorkeWidth={1.5}
            fillColor="#fb923c"
            emptyColor="transparent"
            showTooltip={true}
            tooltipDefaultText="No rating"
            tooltipArray={["Hated it", "Disliked it", "Average", "Good", "Prefect"]}
            tooltipClassName="!bg-gray-200 !text-gray-800 border-1 border-gray-300 text-xs"
          />
        </div>

        <Input
          fullWidth={false}
          variant="bordered"
          label="Review title"
          labelPlacement="outside"
          placeholder="Give your review a title"
          isRequired={true}
        />

        <Textarea
          fullWidth={false}
          variant="bordered"
          label="Comment"
          labelPlacement="outside"
          placeholder="Share your experience with the restaurant, from its food, service, pricing, atmosphere"
          isRequired={true}
        />

        <DropDownInputs />
      </div>

      <Button type="submit" color="primary">
        Submit
      </Button>
    </form>
  );
}
