"use client";
import useQueryParams from "@/app/_hooks/useQueryParams";
import { MagnifyingGlass } from "@/app/_icons/Index";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import useMyMediaQuery from "@/app/_hooks/useMyMediaQuery";
import dynamic from 'next/dynamic';

const Filters = dynamic(() => import('./Filters'), { ssr: false })
const SearchResults = dynamic(() => import('./SearchResults'), { ssr: false })

export default function ExplorePage() {

  const searchParams = useSearchParams();
  const [toFetch, setToFetch] = useState(false);
  const { lgScreenAbv } = useMyMediaQuery();

  useEffect(() => {
    // for cases where users refresh the page, or enter the url with search params directly 
    if (searchParams.has('q')) {
      setToFetch(true);
    }
  }, [searchParams])

  // const ExploreOnMobile = () => {
  //   return (
  //     <main className="max-w-screen-xl mx-auto my-4">
  //       <SearchBar setToFetch={setToFetch} />

  //       <div className="flex justify-between items-center border-1 border-red-500">
  //         <Filters />
  //         <SortMenu />
  //       </div>

  //       <section className="px-4 flex flex-col border-yellow-500 border-1">
  //         <SearchResults toFetch={toFetch} />
  //       </section>
  //     </main>
  //   );
  // };

  return (
    <main className="max-w-screen-xl mx-auto my-4 flex gap-8 justify-between">
      <section className="px-4 w-1/4 border-red-500 border- hidden lg:block ">
        <Filters />
      </section>

      <section className="px-4 w-full lg:w-3/4 flex flex-col border-yellow-500 border-">
        <SearchBar setToFetch={setToFetch} />

        <div className="flex justify-between lg:flex-row-reverse">
          { !lgScreenAbv && <Filters /> }
          <SortMenu />
        </div>    

        <SearchResults toFetch={toFetch} />
      </section>
    </main>
  );
};

const SearchBar = ({ setToFetch } : { setToFetch: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const { queryParams, setQueryParams } = useQueryParams();

  useEffect(() => {
    // make the search bar value & search param in url in sync
    if (searchParams.has('q')) {
      setSearchQuery(searchParams.get('q') as string);
    }
  }, [searchParams])
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setToFetch(true);
    setQueryParams({ q: searchQuery })
  };
  
  return (
    <form className="flex items-center gap-4 mb-4 mx-6" onSubmit={handleSearch}>
      <Input
        variant="flat"
        placeholder="Search words separated by commas, e.g. 'mamak,nasi lemak'"
        classNames={{
          input: "text-foreground ml-2",
          inputWrapper: twMerge(
            'p-0 pl-4',
            theme === 'dark' 
            ? 'bg-slate-800 data-[hover]:!bg-slate-700 data-[focus]:!bg-slate-700/80' 
            : 'bg-white data-[hover]:!bg-white data-[focus]:!bg-white',
          ),
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

  const { theme } = useTheme();
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
      className="mb-4 max-w-[300px] items-center"
      classNames={{
        // the select input
        trigger: twMerge(
          theme === 'dark' 
            ? 'bg-slate-800 data-[hover]:bg-slate-700' 
            : 'bg-white data-[hover]:bg-slate-50',
        ),
        // dropdown contents
        popoverContent: twMerge(
          theme === 'dark' ? 'bg-slate-800' : 'bg-white' 
        ),
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
        <SelectItem 
          key={sortItem.value} 
          classNames={{
            base: twMerge(
              theme === 'dark' 
              ? 'data-[hover]:!bg-slate-700 data-[focus]:!bg-slate-700' 
              : 'data-[hover]:!bg-slate-200 data-[focus]:!bg-slate-200' 
            ),
          }}
        >
          { sortItem.label }
        </SelectItem>
      ))} 
    </Select>
  );
};