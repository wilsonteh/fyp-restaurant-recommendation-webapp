"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReviewList from "./ReviewList";
import { Pen } from "@/app/_icons/Index";

export default function ReviewTab() {

  const params = useParams();
  const { restaurantId } = params;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col items-start gap-4 px-4">
      <Button
        as={Link}
        href={`/restaurant/${restaurantId}/reviews/new`}
        size="sm"
        radius="full"
        endContent={<Pen size={12} />}
        className="self-end bg-gray-800 text-primary-400"
        onClick={onOpen}
      >
        Write a review
      </Button>

      <ReviewList />
    </div>
  );
}
