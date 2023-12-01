"use client";
import useMyMediaQuery from "@/app/_hooks/useMyMediaQuery";
import useQueryParams from "@/app/_hooks/useQueryParams";
import { MagnifyingGlass, Sort } from "@/app/_icons/Index";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useTheme } from "next-themes";
import dynamic from 'next/dynamic';
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const Filters = dynamic(() => import('./Filters'), { ssr: false })
const SearchResults = dynamic(() => import('./SearchResults'), { ssr: false })

export default function ExplorePage() {

  const searchParams = useSearchParams();
  const [toFetch, setToFetch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isClient, setIsClient] = useState(false)
  const { lgScreenAbv } = useMyMediaQuery();
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 
  useEffect(() => {
    // for cases where users refresh the page, or enter the url with search params directly 
    if (searchParams.has('q')) {
      setToFetch(true);
    }
  }, [searchParams])

  return (
    <main className="max-w-screen-xl mx-auto my-4 flex gap-8 justify-between">
      <section className="px-4 w-1/4 border-red-500 border- hidden lg:block ">
        <Filters />
      </section>

      <section className="px-4 w-full lg:w-3/4 flex flex-col border-yellow-500 border-">
        <SearchBar 
          setToFetch={setToFetch} 
          isSearching={isSearching} 
        />
        
        <div className="flex justify-between items-center flex-row lg:flex-row-reverse">
          {!lgScreenAbv && isClient && <Filters />}
          <SortMenu />
        </div>

        <SearchResults 
          toFetch={toFetch} 
          setIsSearching={setIsSearching} 
        />
      </section>
    </main>
  );
};

const SearchBar = ({ 
  setToFetch, isSearching 
} : { 
  setToFetch: React.Dispatch<React.SetStateAction<boolean>>, isSearching: boolean 
}) => {

  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const { queryParams, setQueryParams } = useQueryParams();
  const { register, handleSubmit, formState: { errors } } = useForm<{searchTerm: string}>();

  useEffect(() => {
    // make the search bar value & search param in url in sync
    if (searchParams.has('q')) {
      setSearchQuery(searchParams.get('q') as string);
    }
  }, [searchParams])
  
  const handleSearch = ({ searchTerm }: { searchTerm: string }) => {
    setToFetch(true);
    setQueryParams({ q: searchTerm })
  };

  return (
    <form className="flex items-start gap-4 mb-4 mx-0 sm:mx-6" onSubmit={handleSubmit(handleSearch)}>
      <Input
        variant="flat"
        placeholder="Search by food, cuisine, or restaurant name"
        description="e.g. 'Nasi lemak, Japanese, McDonalds'"
        {...register("searchTerm", { required: "Search bar cannot be left empty" })}
        classNames={{
          input: "text-foreground ml-2 text-xs sm:text-sm",
          inputWrapper: twMerge(
            'p-0 pl-4',
            theme === 'dark' 
            ? 'bg-slate-800 data-[hover]:!bg-slate-700 data-[focus]:!bg-slate-700/80' 
            : 'bg-white data-[hover]:!bg-white data-[focus]:!bg-white',
          ),
          description: twMerge(
            'ml-4 mt-1', 
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          ),
          errorMessage: 'ml-4 mt-1', 
        }}
        startContent={<MagnifyingGlass size={15} />}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        errorMessage={errors.searchTerm?.message}
      />

      <Button type="submit" variant="solid" color="primary" isLoading={isSearching}>
        { isSearching ? 'Searching' : 'Search' }
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
      className="ml-2 mb-4 max-w-[300px] items-center"
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
      // labelPlacement="outside"
      placeholder="Select distance"
      startContent={<Sort size={15} />}
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

