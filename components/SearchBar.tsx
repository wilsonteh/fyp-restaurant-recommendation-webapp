"use client";
import { Button, Input } from "@nextui-org/react";
import SearchIcon from "./icons/SearchIcon";

interface SearchBarProps {}

const SearchBar = () => {



  return (
    <form className="flex">
      <Input 
        variant="flat" 
        placeholder="Search restaurants" 
        classNames={{
          input: "text-foreground pl-2",
          inputWrapper: "p-0 pl-4",
        }}
        startContent={<SearchIcon className="w-4 h-4" />}
        endContent={
          <Button variant="solid" color="primary">
            Search
          </Button>
        }
        />
    </form>
  );
};

export default SearchBar;
