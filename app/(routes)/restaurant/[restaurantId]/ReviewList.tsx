"use client";
import { ReviewSchema } from "@/app/_utils/interfaces/FirestoreSchema";
import ReviewItem from "./ReviewItem";
import {
  CollectionHook,
  useCollection,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import { useParams } from "next/navigation";
import { db } from "@/app/_firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import error from "next/error";

export default function ReviewList() {
  const { restaurantId } = useParams();
  // const [reviews, loading, error ] = collectionHook;

  const collectionRef = collection(db, "reviews");
  const q = query(collectionRef, where("restaurantId", "==", restaurantId));
  const [reviews, loading, error, reload] = useCollectionOnce(q, {
    getOptions: { source: "server" },
  });
  const reviewN = reviews?.docs.length || 0;

  return (
    <div className="flex flex-col gap-2 px-2">
      <h1>Reviews ({reviewN}) </h1>

      <section className="flex flex-col gap-2">
        {reviews &&
          reviews?.docs.map((review) => (
            <ReviewItem
              key={review.id}
              reviewRef={review}
              review={review.data() as ReviewSchema}
            />
          ))}
      </section>
    </div>
  );
}
