"use client";
import { auth } from "@/app/_firebase/auth";
import { checkIsFavourited, db, insertDoc } from "@/app/_firebase/firestore";
import useMyMediaQuery from "@/app/_hooks/useMyMediaQuery";
import { Bookmark, BookmarkOutline, Heart, HeartOutline } from "@/app/_icons/Index";
import { Button } from "@nextui-org/react";
import { collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function FavouriteButton ({ restaurantId } : { restaurantId: string }) {

  const [ user ] = useAuthState(auth);
  const router = useRouter();
  const [isFavourited, setIsFavourited] = useState<boolean|null>(null);

  useEffect(() => {
    async function getIsBookmarked() {
      if (user) {
        let favourited = await checkIsFavourited(user.uid, restaurantId);
        setIsFavourited(favourited);
      }
    }
    getIsBookmarked();
  
  }, [restaurantId, user])

  const toggleBookmark = async (id: string) => {
    if (!user) {
      alert("Please login to favourite this restaurant");
      router.push("/login");
      return;
    };
    setIsFavourited(!isFavourited);
    const favouritesColRef = collection(db, "favourites");
    
    if (isFavourited) {   
      const q = query(favouritesColRef, where("userId", "==", user?.uid), where("restaurantId", "==", id));
      // get the bookmark id, remove bookmark from db
      const snapshot = await getDocs(q);
      snapshot.docs.map(doc => doc.id).forEach(async (docId) => {
        await deleteDoc(doc(db, "favourites", docId))
        console.log(`Favourites of ${docId} has been DELETED!`)
      });
    } 
    else {
      const favouriteData = {
        userId: user?.uid,  
        restaurantId: id,
        createdAt: serverTimestamp(),
      }
      const docRef = await insertDoc("favourites", favouriteData);
      console.log(`Favourites of ${docRef.id} has been ADDED!`);
    }
  }


  return (
    <Button
      color="primary"
      className="min-w-8 xs:min-w-[80px]"
      onClick={() => toggleBookmark(restaurantId)}
      endContent={ isFavourited ? <Bookmark size={15} /> : <BookmarkOutline size={15} /> }
    >
      <span className="hidden xs:inline"> { isFavourited ?  'Favourited': 'Favourite' } </span>
    </Button>
  );
};