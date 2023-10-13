"use client";
import { Button, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import InfoIcon from "./icons/InfoIcon";
import MapMarkerIcon from "./icons/MapMarkerIcon";
import PenIcon from "./icons/PenIcon";
import UtensilsIcon from "./icons/UtensilsIcon";
import ServiceIcon from "./icons/ServiceIcon";
import DollarIcon from "./icons/DollarIcon";
import HeartIcon from "./icons/HeartIcon";
import CircleChevronRight from "./icons/circle-chevron-right";
import LocationArrow from "./icons/location-arrow";
import ReviewList from "./ReviewList";

const RestaurantDetail = () => {
  const [selectedTab, setSelectedTab] = useState("details");

  const weekday_text = [
    "Monday: 11:30\u202fAM-11:00\u202fPM",
    "Tuesday: 11:30\u202fAM-11:00\u202fPM",
    "Wednesday: 11:30\u202fAM-11:00\u202fPM",
    "Thursday: 11:30\u202fAM-11:00\u202fPM",
    "Friday: 11:30\u202fAM-11:30\u202fPM",
    "Saturday: 11:30\u202fAM-11:30\u202fPM",
    "Sunday: 11:30\u202fAM-11:00\u202fPM",
  ];

  const OpeningHours = weekday_text.map(text => {
    const [day, openingHr] = text.split(": ");
    return (
      <li key={day} className="flex justify-between gap-8">
        <span> {day}: </span>
        <span> {openingHr} </span>
      </li>
    )
  })

  return (
    <div className="w-full">
      <section className="w-full flex gap-2 justify-start mb-8">
        { new Array(5).fill(0).map((_, i) => (
          <Image
            key={i}
            className="rounded-xl"
            src="https://via.placeholder.com/280x280"
            width={280}
            height={280}
            alt="restaurant image"
          />
        ))}
      </section>

      <section className="">
        description
      </section>

      <section className="max-w-screen-md mx-auto">
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
                <InfoIcon />
                <span>Details</span>
              </div>
            }
            >
            <div className="flex justify-center gap-8">
              <div className="border-1 border-orange-500 p-4">
                <h4 className="font-medium">Opening hours</h4>
                <ul className="flex flex-col gap-1 text-sm">
                  { OpeningHours }
                </ul>
              </div>

              <div className="border-1 border-blue-500 p-4">
                <h4 className="font-medium">Rating by component</h4>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center gap-x-2">
                    <UtensilsIcon className="w-4 h-4" />
                    <span className="flex-initial w-[150px]">Food</span>
                    <span>4.2</span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <ServiceIcon className="w-4 h-4" />
                    <span className="flex-initial w-[150px]">Service</span>
                    <span>4.2</span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <DollarIcon className="w-4 h-4" />
                    <span className="flex-initial w-[150px]">Value</span>
                    <span>4.2</span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <HeartIcon className="w-4 h-4" />
                    <span className="flex-initial w-[150px]">Atmosphere</span>
                    <span>4.2</span>
                  </div>
                  <Button
                    size="sm"
                    endContent={<CircleChevronRight className="w-3 h-3" />}
                    className="bg-gray-800 text-primary-400"
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
                <MapMarkerIcon />
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
                  25, Jalan SS 15/5a, Ss 15, 47500 Subang Jaya, Selangor, Malaysia
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
                <PenIcon />
                <span>Reviews</span>
              </div>
            }
          >
            <div className="">
              <Button
                size="sm"
                radius="full"
                endContent={<PenIcon className="w-3 h-3" />}
                className="bg-gray-800 text-primary-400"
                >
                Write a review
              </Button>

              <ReviewList />              
            </div>
          </Tab>
        </Tabs>
      </section>

    </div>
  );
};

export default RestaurantDetail;
