"use client";
import Pen from "@/app/_icons/pen";
import { Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import ReviewList from "./ReviewList";
import { useParams } from "next/navigation";

export default function ReviewTab() {

  const params = useParams();
  const { restaurantId } = params;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <div className="flex flex-col items-end gap-2 px-4">
      <Button
        as={Link}
        href={`/restaurant/${restaurantId}/reviews/new`}
        size="sm"
        radius="full"
        endContent={<Pen size={12} />}
        className="bg-gray-800 text-primary-400"
        onClick={onOpen}
      >
        Write a review
      </Button>

      <ReviewList />
    </div>
  );
}
