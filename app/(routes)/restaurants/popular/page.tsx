"use client";
import PopularRestaurantList from "./PopularRestaurantList";
import { NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import useSWRImmutable from "swr/immutable";
import { useSearchParams } from "next/navigation";
import { fetcher } from "@/app/_lib/swr/fetcher";
import { Pagination } from "@nextui-org/react";
import { useState } from "react";

export default function PopularRestaurantPage() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius");
  const [requestUrl, setRequestUrl] = useState(
    `/api/nearby-search?lat=${lat}&lng=${lng}&radius=${radius}`
  );
  const [currentPage, setCurrentPage] = useState(1);
  // const [nextPageToken, setNextPageToken] = useState<string|null>(null);

  const { data, isLoading, error } = useSWRImmutable(requestUrl, fetcher, {
    keepPreviousData: true,
  });
  console.log("🚀 data:", data)

  const restaurants = data?.results || [];
  const nextPageToken = data?.next_page_token || null;

  const handlePageChange = (page: number) => {
    console.log("page changed to pg ", page);
    setCurrentPage(page);
    if (nextPageToken) {
      console.log("nextPageToken", nextPageToken);
      setRequestUrl((requestUrl) => `${requestUrl}&pagetoken=${nextPageToken}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <h1 className="font-semibold">popular restaurants with paginations</h1>
      {restaurants?.map((restaurant: NearbySearchRestaurant, i: number) => (
        <div key={restaurant.name} className="">
          {i + 1}: {restaurant.name}
        </div>
      ))}

      <Pagination
        color="secondary"
        variant="flat"
        total={60 / 20}
        page={currentPage}
        showControls
        onChange={handlePageChange}
      />

      {/* <PopularRestaurantList restaurants={restaurants} /> */}
    </div>
  );
}