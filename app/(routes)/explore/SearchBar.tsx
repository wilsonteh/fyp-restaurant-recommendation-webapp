"use client";
import MagnifyingGlass from "@/app/_icons/magnifying-glass";
import { Button, Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SearchBar({ 
  setToFetch,  
} : { 
  setToFetch: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // make the search bar value & search query in url in sync
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
        placeholder="Search restaurants by name or cuisines"
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
 
 