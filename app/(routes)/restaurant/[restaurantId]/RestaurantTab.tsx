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

export default function RestaurantTab ({
  restaurant,
}: {
  restaurant: RestaurantDetailInterface;
}) {

  const { restaurantId } = useParams();
  const [selectedTab, setSelectedTab] = useState("details");
 

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
        className="w-full"
      >
        <DetailsTab 
          restaurant={restaurant} 
          setSelectedTab={setSelectedTab} 
        />
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
        <LocationTab restaurant={restaurant} />
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

const DetailsTab = ({ 
  restaurant, 
  setSelectedTab 
}: { 
  restaurant: RestaurantDetailInterface, 
  setSelectedTab: (key: string) => void
}) => {
  const { weekday_text } = restaurant.current_opening_hours;
  const ratings = [
    { label: "food", value: 4.2, icon: <Utensils size={15} /> },
    { label: "service", value: 3.9, icon: <BellConcierge size={15} /> },
    { label: "value", value: 4.4, icon: <DollarSign size={15} /> },
    { label: "atmosphere", value: 4.3, icon: <Heart size={15} /> },
  ];
  const features = [
    { key: "delivery", icon: "" },
    { key: "dine_in", icon: "" },
    { key: "takeout", icon: "" },
    { key: "reservable", icon: "" },
    { key: "wheelchair_accessible_entrance", icon: "" },
  ];

  const serves = [
    { key: "serves_beer", icon: "" },
    { key: "serves_wine", icon: "" },
    { key: "serves_breakfast", icon: "" },
    { key: "serves_lunch", icon: "" },
    { key: "serves_dinner", icon: "" },
    { key: "serves_vegetarian_food", icon: "" },
  ];

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
    <div className="grid grid-cols-2 gap-4">
      <div className="opening-hour px-8 py-4 bg-slate-200/40 rounded-lg flex flex-col gap-1">
        <h4 className="text-lg font-medium">Opening hours</h4>
        <ul className="flex flex-col gap-1 text-sm"> {OpeningHours} </ul>
      </div>

      <div className="multi-rating px-8 py-4 bg-zinc-200/30 rounded-lg flex flex-col gap-1">
        <h4 className="text-lg font-medium">Rating by component</h4>
        <div className="flex flex-col gap-3 text-sm">
          {ratings.map(({ label, value, icon }) => (
            <div key={label} className="flex justify-between items-center capitalize">
              <div className="flex items-center gap-5">
                {icon}
                <span className="flex-initial w-[150px]"> {label} </span>
              </div>
              <span>{value}</span>
            </div>
          ))}

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

      <div className="features px-8 py-4 bg-zinc-200/30 rounded-lg flex flex-col gap-1">
        <h3 className="text-lg font-medium">Features</h3>
        {features.map(({ key, icon }) => (
          <div
            key={key}
            className="flex justify-between items-center gap-x-2 capitalize text-sm"
          >
            {icon}
            <span className="flex-initial w-[150px]">
              {" "}
              {key.replace("_", " ")}{" "}
            </span>
            <span> {restaurant[key] ? "Yes" : "No"} </span>
          </div>
        ))}
      </div>

      <div className="serve px-8 py-4 bg-slate-200/40 rounded-lg flex flex-col gap-1">
        <h3 className="text-lg font-medium">Serves</h3>
        {serves.map(({ key, icon }) => (
          <div
            key={key}
            className="flex justify-between items-center gap-x-2 capitalize text-sm"
          >
            {icon}
            <span className="flex-initial w-[150px]">
              {" "}
              {key.replaceAll("_", " ")}{" "}
            </span>
            <span> {restaurant[key] ? "Yes" : "No"} </span>
          </div>
        ))}
      </div>
    </div>
  );
}
