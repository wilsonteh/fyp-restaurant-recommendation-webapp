"use client";
import MagnifyingGlass from "@/app/_icons/magnifying-glass";
import { Button, Input } from "@nextui-org/react";
import React, { useRef } from "react";

export default function SearchBar({
  searchQuery,
  setSearchQuery, 
} : {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; 
}) {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      setSearchQuery(inputRef.current.value);
    }
  };
  
  return (
    <form className="flex mb-4" onSubmit={handleSearch}>
      <Input
        variant="flat"
        placeholder="Search restaurants by name or cuisines"
        classNames={{
          input: "text-foreground pl-2",
          inputWrapper: "p-0 pl-4",
        }}
        startContent={<MagnifyingGlass size={15} />}
        ref={inputRef}
      />

      <Button type="submit" variant="solid" color="primary">
        Search
      </Button>
    </form>
  );
};
 
 