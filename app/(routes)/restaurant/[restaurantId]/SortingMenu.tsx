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
import { useParams } from "next/navigation";

export default function SortingMenu({
  selectedSortKey, 
  setSelectedSortKey,
  setDbQuery, 
} : {
  selectedSortKey: string; 
  setSelectedSortKey: (key: string) => void;
  setDbQuery: (query: Query) => void;
}) {

  const sortKeys = ['default', 'newest', 'oldest', 'highest rated', 'lowest rated'];
  const params = useParams();
  const { restaurantId } = useParams();
  const collectionRef = collection(db, "reviews");

  const handleSortingKeyChange = (key: string) => {
    setSelectedSortKey(key);
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
    const sortedQuery = sortField ? 
      query(collectionRef, basicQuery, orderBy(sortField, sortDirection)) : 
      query(collectionRef, basicQuery);

    setDbQuery(sortedQuery);
  }

  return (
    <div className="flex items-center gap-2">
      <div>Sort by:</div>

      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
            {selectedSortKey}
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={(keys) => handleSortingKeyChange(Array.from(keys)[0] as string)}
        >
          {sortKeys.map((sortKey) => (
            <DropdownItem key={sortKey} className="capitalize">
              {sortKey}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
