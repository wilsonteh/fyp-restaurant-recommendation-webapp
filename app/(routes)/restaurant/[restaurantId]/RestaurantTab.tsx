"use client";
import BellConcierge from "@/app/_icons/bell-concierge";
import CircleChevronRight from "@/app/_icons/circle-chevron-right";
import CircleInfo from "@/app/_icons/circle-info";
import DollarSign from "@/app/_icons/dollar-sign";
import Heart from "@/app/_icons/heart";
import LocationArrow from "@/app/_icons/location-arrow";
import LocationDot from "@/app/_icons/location-dot";
import Pen from "@/app/_icons/pen";
import Utensils from "@/app/_icons/utensils";
import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import { Button, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import ReviewList from "./ReviewList";

const RestaurantTab = ({
  restaurant,
}: {
  restaurant: RestaurantDetailInterface;
}) => {

  const { restaurantId } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState("details");
  const { weekday_text } = restaurant.current_opening_hours;

  const OpeningHours = weekday_text.map((text) => {
    const [day, openingHr] = text.split(": ");
    return (
      <li key={day} className="flex justify-between gap-8">
        <span> {day}: </span>
        <span> {openingHr} </span>
      </li>
    );
  });

  return (
    <Tabs
      aria-label="Tab options"
      color="secondary"
      variant="solid"
      fullWidth={true}
      selectedKey={selectedTab}
      onSelectionChange={(key) => setSelectedTab(key as string)}
      classNames={{
        tabList: "bg-gray-200 p-2",
        tab: "py-2 h-full",
      }}
    >
      <Tab
        key="details"
        title={
          <div className="flex items-center space-x-2">
            <CircleInfo />
            <span>Details</span>
          </div>
        }
      >
        <div className="flex justify-center gap-8">
          <div className="border-1 p-4">
            <h4 className="font-medium">Opening hours</h4>
            <ul className="flex flex-col gap-1 text-sm"> {OpeningHours} </ul>
          </div>

          <div className="border-1 p-4 flex flex-col gap-2">
            <h4 className="font-medium">Rating by component</h4>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-x-2">
                <Utensils className="w-4 h-4" />
                <span className="flex-initial w-[150px]">Food</span>
                <span>4.2</span>
              </div>
              <div className="flex items-center gap-x-2">
                <BellConcierge className="w-4 h-4" />
                <span className="flex-initial w-[150px]">Service</span>
                <span>4.2</span>
              </div>
              <div className="flex items-center gap-x-2">
                <DollarSign className="w-4 h-4" />
                <span className="flex-initial w-[150px]">Value</span>
                <span>4.2</span>
              </div>
              <div className="flex items-center gap-x-2">
                <Heart className="w-4 h-4" />
                <span className="flex-initial w-[150px]">Atmosphere</span>
                <span>4.2</span>
              </div>
              <Button
                size="sm"
                endContent={<CircleChevronRight className="w-3 h-3" />}
                className="bg-gray-800 text-primary-400"
                onClick={() => setSelectedTab("reviews")}
              >
                View Reviews
              </Button>
            </div>
          </div>
        </div>
      </Tab>

      <Tab
        key="location"
        title={
          <div className="flex items-center space-x-2">
            <LocationDot />
            <span>Location</span>
          </div>
        }
      >
        <div className="flex flex-col items-center gap-4">
          <Image
            src="https://via.placeholder.com/600x300"
            width={600}
            height={300}
            alt="map"
          />
          <div className="flex items-center gap-4">
            <p>
              { restaurant.formatted_address }
            </p>
            <Button
              size="sm"
              endContent={<LocationArrow className="w-3 h-3" />}
              className="bg-gray-800 text-primary-400"
            >
              Get directions
            </Button>
          </div>
        </div>
      </Tab>

      <Tab
        key="reviews"
        title={
          <div className="flex items-center space-x-2">
            <Pen />
            <span>Reviews</span>
          </div>
        }
      >
        <div className="">
          <Button
            as={Link}
            href={`/restaurant/${restaurantId}/reviews/new`}
            size="sm"
            radius="full"
            endContent={<Pen className="w-3 h-3" />}
            className="bg-gray-800 text-primary-400"
            onClick={onOpen}

          >
            Write a review
          </Button>

          <ReviewList />

        </div>
      </Tab>
    </Tabs>
  );
};

export default RestaurantTab;
