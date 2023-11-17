"use client";
import { auth } from "@/app/_firebase/auth";
import { db } from "@/app/_firebase/firestore";
import { ReviewSchema } from "@/app/_utils/interfaces/FirestoreSchema";
import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ReviewItem from "./ReviewItem";

export default function ReviewsPage() {

  const [user] = useAuthState(auth);
  const collectionRef = collection(db, "reviews");
  const fetchReviewsQuery = query(
    collectionRef, 
    where("user.id", "==", user ? user.uid : "")
  );
  const [reviews, isLoading, error, reload] = useCollectionOnce(fetchReviewsQuery, {
    getOptions: { source: "server" },
  });

  if (isLoading) return <div>Loading data...</div>

  return (
    <main className="px-4">
      <h1 className="font-semibold text-xl">My Reviews</h1>
      <ResponsiveMasonry columnsCountBreakPoints={{ 300: 1, 500: 2, 750: 3, 1000: 4}}>
        <Masonry gutter="1.2rem">
          {reviews?.docs.map((review, i) => (
            <ReviewItem
              key={review.id}
              review={review.data() as ReviewSchema}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

    </main>
  );
}
