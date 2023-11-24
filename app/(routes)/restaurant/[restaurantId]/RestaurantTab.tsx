"use client";
import BellConcierge from "@/app/_icons/bell-concierge";
import CircleChevronRight from "@/app/_icons/circle-chevron-right";
import CircleInfo from "@/app/_icons/circle-info";
import DollarSign from "@/app/_icons/dollar-sign";
import Heart from "@/app/_icons/heart";
import LocationDot from "@/app/_icons/location-dot";
import Pen from "@/app/_icons/pen";
import Utensils from "@/app/_icons/utensils";
import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import LocationTab from "./LocationTab";
import ReviewTab from "./ReviewTab";
import useGeolocation from "@/app/_hooks/useGeolocation";
import { fetcher } from "@/app/_lib/swr/fetcher";
import useSWRImmutable from "swr/immutable";

const RestaurantTab = ({
  restaurant,
}: {
  restaurant: RestaurantDetailInterface;
}) => {

  const { restaurantId } = useParams();
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
      color="primary"
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
            <CircleInfo size={15} />
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
                <Utensils size={15} />
                <span className="flex-initial w-[150px]">Food</span>
                <span>4.2</span>
              </div>
              <div className="flex items-center gap-x-2">
                <BellConcierge size={15} />
                <span className="flex-initial w-[150px]">Service</span>
                <span>4.2</span>
              </div>
              <div className="flex items-center gap-x-2">
                <DollarSign size={15} />
                <span className="flex-initial w-[150px]">Value</span>
                <span>4.2</span>
              </div>
              <div className="flex items-center gap-x-2">
                <Heart size={15} />
                <span className="flex-initial w-[150px]">Atmosphere</span>
                <span>4.2</span>
              </div>
              <Button
                size="sm"
                endContent={<CircleChevronRight size={12} />}
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
            <LocationDot size={15} />
            <span>Location</span>
          </div>
        }
      >
        <LocationTab
          restaurant={restaurant}
        />
      </Tab>

      <Tab
        key="reviews"
        title={
          <div className="flex items-center space-x-2">
            <Pen size={15} />
            <span>Reviews</span>
          </div>
        }
      >
        <ReviewTab />
      </Tab>
    </Tabs>
  );
};

export default RestaurantTab;
