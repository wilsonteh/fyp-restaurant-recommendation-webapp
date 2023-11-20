"use client";
import MagnifyingGlass from "@/app/_icons/magnifying-glass";
import { Button, Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import Filters from "./Filters";

export default function ExplorePage() {

  const searchParams = useSearchParams();
  const [toFetch, setToFetch] = useState(false);

  useEffect(() => {
    // for cases where users refresh the page, or enter the url with search params directly 
    if (searchParams.has('q')) {
      setToFetch(true);
    }
  }, [searchParams])

  return (
    <main className="max-w-screen-xl mx-auto h-screen my-4 flex gap-8 justify-between">
      <section className="w-1/4">
        <Filters />
      </section>

      <section className="border-1 border-teal-500 w-3/4">
        <SearchBar setToFetch={setToFetch} />
        {/* <SearchResults toFetch={toFetch} /> */}
      </section>
    </main>
  );
};

const SearchBar = ({ setToFetch } : { setToFetch: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // make the search bar value & search param in url in sync
    if (searchParams.has('q')) {
      setSearchQuery(searchParams.get('q') as string);
    }
  }, [searchParams])
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setToFetch(true);
    router.push(`/explore?q=${searchQuery}`)
  };
  
  return (
    <form className="flex mb-4 mx-6" onSubmit={handleSearch}>
      <Input
        variant="flat"
        placeholder="Search words separated by commas, e.g. 'mamak,nasi lemak'"
        classNames={{
          input: "text-foreground pl-2",
          inputWrapper: "p-0 pl-4",
        }}
        startContent={<MagnifyingGlass size={15} />}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />

      <Button type="submit" variant="solid" color="primary">
        Search
      </Button>
    </form>
  );
};