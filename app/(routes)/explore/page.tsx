"use client";
import { fetcher } from "@/app/_lib/swr/fetcher";
import { useState } from "react";
import useSWRImmutable from "swr/immutable";
import SearchBar from "./SearchBar";

export default function ExplorePage() {
  
  // const [toFetch, setToFetch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <main className="max-w-screen-md mx-auto h-screen">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      { searchQuery != "" && <SearchResults searchString={searchQuery} /> }

    </main>
  );
}

const SearchResults = ({ searchString }: { searchString: string }) => {

  const { data, isLoading, error } = useSWRImmutable(
    `/api/nearby-search?lat=3.067440966219083&lng=101.60387318211183&radius=100000&keyword=${searchString}`, 
    fetcher
  );
  
  if (error) return <div>Failed to load ...</div>
  if (isLoading) return <div>Loading ...</div>

  return (
    <div className="">
      { data?.results.map((restaurant: any) => (
        <div key={restaurant.name}> { restaurant.name } </div>
      ))}
    </div>
  )
}