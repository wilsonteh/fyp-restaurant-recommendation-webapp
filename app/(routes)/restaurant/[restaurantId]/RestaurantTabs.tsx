"use client";
import { Beer, BellConcierge, Breakfast, CalendarAlt, Check, CircleInfo, DeliveryDining, Dinner, DollarSign, Heart, Leaf, LocationDot, Lunch, Pen, TakeoutDining, Times, Utensils, Wheelchair, WineGlassAlt } from "@/app/_icons/Index";
import CircleChevronRightIcon from "@/app/_icons/circle-chevron-right";
import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import LocationTab from "./LocationTab";
import ReviewTab from "./ReviewTab";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

export default function RestaurantTabs ({
  restaurant,
}: {
  restaurant: RestaurantDetailInterface;
}) {

  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState("details");
 
  return (
    <Tabs
      aria-label="Tab options"
      variant="underlined"
      fullWidth={true}
      selectedKey={selectedTab}
      onSelectionChange={(key) => setSelectedTab(key as string)}
      classNames={{
        base: twMerge(
          'mx-auto w-[500px] md:w-[700px] lg:w-[800px]',
        ),
        tabList: twMerge(
          'rounded-full', 
          theme === 'dark' ? '!bg-slate-800' : 'bg-white border-2 border-slate-200',
        ),
        tab: "px-0 py-2 h-full rounded-full",
        tabContent: twMerge(
          'group-data-[hover]:opacity-90',
          theme === 'dark' 
          ? 'text-slate-200 group-data-[selected]:text-primary-400 group-data-[hover]:opacity-90' 
          : 'text-slate-800 group-data-[selected]:text-secondary-700'
        ),
        cursor: twMerge(
          'rounded-full w-[70%]',
          theme === 'dark' ? 'bg-primary-400' : 'bg-secondary-700',
        ),
        panel: "border-red-500",
      }}
    >
      <Tab
        key="details"
        title={
          <div className="flex items-center gap-2">
            <CircleInfo size={15} />
            <span>Details</span>
          </div>
        } 
      >
        <DetailsTab 
          restaurant={restaurant} 
          setSelectedTab={setSelectedTab} 
        />
      </Tab>

      <Tab
        key="location"
        title={
          <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2">
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

  const { theme } = useTheme();
  const { weekday_text } = restaurant.current_opening_hours;
  const ratings = [
    { label: "food", value: 4.2, icon: <Utensils size={15} /> },
    { label: "service", value: 3.9, icon: <BellConcierge size={15} /> },
    { label: "value", value: 4.4, icon: <DollarSign size={15} /> },
    { label: "atmosphere", value: 4.3, icon: <Heart size={15} /> },
  ];
  const features = [
    { key: "delivery", icon: <DeliveryDining size={18} /> },
    { key: "dine_in", icon: <Utensils size={18} /> },
    { key: "takeout", icon: <TakeoutDining size={18}/> },
    { key: "reservable", icon: <CalendarAlt size={18} /> },
    { key: "wheelchair_accessible_entrance", icon: <Wheelchair size={18} /> },
  ];
  const serves = [
    { key: "serves_beer", icon: <Beer size={15} /> },
    { key: "serves_wine", icon: <WineGlassAlt size={15} /> },
    { key: "serves_breakfast", icon: <Breakfast size={15} /> },
    { key: "serves_lunch", icon:  <Lunch size={15} />},
    { key: "serves_dinner", icon: <Dinner size={15} /> },
    { key: "serves_vegetarian_food", icon: <Leaf size={15} /> },
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
    <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
      <div className={twMerge(
        'opening-hour px-8 py-4 rounded-lg flex flex-col gap-3', 
        theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
      )}>
        <h4 className="text-lg font-medium capitalize text-center">Opening hours</h4>
        <ul className="flex flex-col gap-1 text-sm"> {OpeningHours} </ul>
      </div>

      <div className={twMerge(
        'multi-rating px-8 py-4  rounded-lg flex flex-col gap-3', 
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
      )}>
        <h4 className="text-lg font-medium capitalize text-center">Rating by component</h4>
        <div className="flex flex-col items-stretch gap-3 text-sm">
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
            color="primary"
            size="sm"
            endContent={<CircleChevronRightIcon size={12} />}
            className="self-end px-6 py-2 items-center"
            onClick={() => setSelectedTab("reviews")}
          >
            View Reviews
          </Button>
        </div>
      </div>

      <div className={twMerge(
        'features px-8 py-4 rounded-lg flex flex-col gap-3', 
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
      )}>
        <h3 className="text-lg font-medium capitalize text-center">Features</h3>
        {features.map(({ key, icon }) => (
          <div key={key} className="flex justify-between items-center capitalize text-sm">
            <div className="flex justify-center items-center gap-4 mr-4">
              <span> {icon} </span>
              <span> {key.replaceAll("_", " ")} </span>
            </div>
            <span> 
              {restaurant[key] 
              ? <Check size={15} className="text-success-700" /> 
              : <Times size={15} className="text-danger-600" /> } 
            </span>
          </div>
        ))}
      </div>

      <div className={twMerge(
        'serve px-8 py-4 bg-slate-200/40 rounded-lg flex flex-col gap-3', 
        theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
      )}>
        <h3 className="text-lg font-medium capitalize text-center">Serves</h3>
        {serves.map(({ key, icon }) => (
          <div key={key} className="flex justify-between items-center capitalize text-sm">
            <div className="flex justify-center items-center gap-4">
              <span> {icon} </span>
              <span>{key.replaceAll("_", " ")} </span>
            </div>
            <span> 
              {restaurant[key] 
              ? <Check size={15} className="text-success-700" /> 
              : <Times size={15} className="text-danger-600" /> } 
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
