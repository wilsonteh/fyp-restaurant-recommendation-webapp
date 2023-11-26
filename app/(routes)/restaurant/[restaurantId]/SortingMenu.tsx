"use client";
import { db } from "@/app/_firebase/firestore";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { where, query, orderBy, Query, collection } from "firebase/firestore";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function SortingMenu({
  selectedSortKey, 
  setSelectedSortKey,
  setDbQuery, 
  reviewN,
} : {
  selectedSortKey: string; 
  setSelectedSortKey: (key: string) => void;
  setDbQuery: (query: Query) => void;
  reviewN: number;
}) {

  const { theme } = useTheme();
  const sortKeys = ['default', 'newest', 'oldest', 'highest rated', 'lowest rated'];
  const { restaurantId } = useParams();
  const collectionRef = collection(db, "reviews");

  const handleSortingKeyChange = (key: string) => {
    setSelectedSortKey(key);

    if (reviewN > 1) {
      const basicQuery = where('restaurantId', '==', restaurantId);
      let sortField: string | undefined;
      let sortDirection: 'asc' | 'desc' | undefined;
      switch (key) {
        case 'newest':
          sortField = 'createdAt';
          sortDirection = 'desc';
          break;
        case 'oldest':
          sortField = 'createdAt';
          sortDirection = 'asc';
          break;
        case 'highest rated':
          sortField = 'rating.main';
          sortDirection = 'desc';
          break;
        case 'lowest rated':
          sortField = 'rating.main';
          sortDirection = 'asc';
          break;
        default:
          break;
      }
      const sortedQuery = sortField 
        ? query(collectionRef, basicQuery, orderBy(sortField, sortDirection)) 
        : query(collectionRef, basicQuery);

      setDbQuery(sortedQuery);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div>Sort by:</div>

      <Dropdown className={twMerge(
        'border-1',
        theme === 'dark' 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-slate-300'
      )}>
        <DropdownTrigger>
          <Button
            color="primary"
            variant="bordered"
            className={twMerge(
              'capitalize',
              theme === 'dark' ? 'text-slate-400 border-slate-400' : 'text-slate-800 border-slate-500'
            )}
          >
            {selectedSortKey}
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Sort reviews"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={(keys) =>
            handleSortingKeyChange(Array.from(keys)[0] as string)
          }
          classNames={{

          }}
        >
          {sortKeys.map((sortKey) => (
            <DropdownItem 
              key={sortKey} 
              className="capitalize" 
              classNames={{
                base: twMerge(
                  theme === 'dark' 
                  ? 'data-[selected]:!bg-slate-700 data-[focus]:!bg-slate-700' 
                  : 'data-[hover]:!bg-slate-200 data-[focus]:!bg-slate-200' 
                ),
              }}
            >
              {sortKey}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
