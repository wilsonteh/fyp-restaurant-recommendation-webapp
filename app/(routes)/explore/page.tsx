"use client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import Filters from "./Filters";
import useQueryParams from "@/app/_hooks/useQueryParams";
import { MagnifyingGlass } from "@/app/_icons/Index";

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

      <section className="w-3/4 flex flex-col">
        <SearchBar setToFetch={setToFetch} />
        <div className="flex flex-row-reverse">
          <SortMenu />
        </div>
        <SearchResults toFetch={toFetch} />
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

    // get all filter & sort search params from url
    let otherQueryString = '';
    const possibleSearchParams = ['distance', 'opennow', 'minprice', 'maxprice', 'sortby'];
    for (let key of possibleSearchParams) {
      if (searchParams.has(key)) {
        otherQueryString += `${key}=${searchParams.get(key)}&`
      }
    }
    otherQueryString = otherQueryString.slice(0, -1); // remove the last '&' char
    router.push(`/explore?q=${searchQuery}&${otherQueryString}`)
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

const SortMenu = () => {

  const { queryParams, setQueryParams } = useQueryParams();
  const searchParams = useSearchParams();
  const key = "sortby";
  const sortItems = [
    { label: "Default", value: "default" }, 
    { label: "Nearest", value: "nearest" },
    { label: "Highest rated", value: "highest_rated" },
    { label: "Most reviewed", value: "most_reviewed" },
  ];
  const [selectedSortItem, setSelectedSortItem] = useState([sortItems[0].value])

  const onSortItemChange = useCallback(
    (sortItem: string) => {
      setSelectedSortItem([sortItem]);
      let sortKey = queryParams?.get(key);
      if (sortItem === "default") {
        setQueryParams({ [key]: undefined });
        return;
      } 
      else if (sortItem === sortKey || !sortItem) {
        setQueryParams({
          [key]: undefined,   
        });
        return;
      }
      setQueryParams({ [key]: sortItem });
      },
    [queryParams, setQueryParams]
  );

  useEffect(() => {
    // make the select input value & search param in url in sync
    if (searchParams.has(key)) {
      setSelectedSortItem([searchParams.get(key) as string]);
    } else {
      setSelectedSortItem(['default']);
    }
  }, [searchParams])

  return (
    <Select
      className="mb-4 max-w-[300px]"
      classNames={{
        label: "w-[90px]",
      }}
      label="Sort by:"
      labelPlacement="outside-left"
      placeholder="Select distance"
      disallowEmptySelection
      defaultSelectedKeys={['default']} 
      selectedKeys={selectedSortItem}
      onSelectionChange={(keys) => onSortItemChange(Array.from(keys)[0] as string)}
    >
      {sortItems.map((sortItem) => (
        <SelectItem key={sortItem.value} className="">
          { sortItem.label }
        </SelectItem>
      ))} 
    </Select>
  );
};