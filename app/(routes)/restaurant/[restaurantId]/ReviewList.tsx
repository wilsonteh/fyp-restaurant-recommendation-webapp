"use client";
import { db } from "@/app/_firebase/firestore";
import { ReviewSchema } from "@/app/_utils/interfaces/FirestoreSchema";
import { Query, collection, query, where } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import ReviewItem from "./ReviewItem";
import SortingMenu from "./SortingMenu";
import Link from "next/link";

export default function ReviewList() {
  const { restaurantId } = useParams();
  const collectionRef = collection(db, "reviews");
  const [selectedSortKey, setSelectedSortKey] = useState('default');
  const [dbQuery, setDbQuery] = useState<Query>(query(
    collectionRef, 
    where("restaurantId", "==", restaurantId), 
  ))

  const [reviews, isLoading, error, reload] = useCollectionOnce(dbQuery, {
    getOptions: { source: "server" },
  });
  const reviewN = reviews?.docs.length || 0;

  return (
    <div className="flex flex-col gap-2 px-2 w-full">
      <div className="flex justify-between items-center">
        <h1>Reviews ({reviewN}) </h1>
        <SortingMenu
          selectedSortKey={selectedSortKey}
          setSelectedSortKey={setSelectedSortKey}
          setDbQuery={setDbQuery}
          reviewN={reviewN}
        />
      </div>

      { reviewN === 0 && <NoReview /> }
        
      <section className="flex flex-col gap-2 w-full">
        {error ? (
          <div className="">
            <p>{error.name}</p>
            <p>{error.code}</p>
            <p>{error.message}</p>
          </div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          reviews?.docs.map((review) => (
            <ReviewItem
              key={review.id}
              reviewRef={review}
              review={review.data() as ReviewSchema}
            />
          ))
        )}
      </section>
    </div>
  );
};

const NoReview = () => {
  const { restaurantId } = useParams();
  
  return (
    <div className="flex flex-col items-center gap-2">
      <p> No reviews yet </p>
      <p> 
        Be the first to {" "}  
        <Link href={`/restaurant/${restaurantId}/reviews/new`} className="underline">review</Link>
        {" "} this restaurant! 
      </p>
    </div>
  )
};