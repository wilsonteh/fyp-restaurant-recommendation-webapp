"use client";
import { auth } from "@/app/_firebase/auth";
import { db } from "@/app/_firebase/firestore";
import TrashAltIcon from "@/app/_icons/trash-alt";
import { fetcher } from "@/app/_lib/swr/fetcher";
import { FavouritesSchema } from "@/app/_utils/interfaces/FirestoreSchema";
import { Button, Card, CardBody, Skeleton } from "@nextui-org/react";
import { collection, deleteDoc, doc, orderBy, query, where } from "firebase/firestore";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useSWRImmutable from "swr/immutable";
import { twMerge } from "tailwind-merge";

export default function FavouritesPage() {

  const [user] = useAuthState(auth);
  const collectionRef = collection(db, "favourites");
  const fetchQuery = query(
    collectionRef, 
    where("userId", "==", user ? user.uid : ""), 
    orderBy("createdAt", "desc"),
  );
  const [favouritesSnap, isLoading, error] = useCollection(fetchQuery);
  
  if (isLoading) return <div>Loading favourited...</div>
  if (error) return <div>Error... {error.message} </div>

  return (
    <div className="">
      <h1 className="font-semibold text-xl mb-4">
        My Favourited Restaurants
        ({favouritesSnap?.docs.length })
      </h1>

      { favouritesSnap?.docs.length === 0 && <NoFavourite /> }
      
      <ResponsiveMasonry columnsCountBreakPoints={{ 300: 1, 500: 2, 750: 3, 1000: 4}}>
        <Masonry gutter="1.2rem">
          {favouritesSnap?.docs.map(favourite => (
            <FavouriteItem
              key={favourite.id}
              id={favourite.id}
              favourite={favourite.data() as FavouritesSchema}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

const FavouriteItem = ({ id, favourite }: { id: string, favourite: FavouritesSchema }) => {

  const { theme } = useTheme();
  const date = favourite.createdAt.toDate();
  const datetime = date.toLocaleString();

  const { data: restaurant, isLoading } = useSWRImmutable<any>(
    `/api/place-detail?placeId=${favourite.restaurantId}&fields=name,vicinity,photos`, 
    fetcher
  );

  const { data: imgUrl, isLoading: isImgLoading } = useSWRImmutable(
    () => {
      if (restaurant) {
        return `/api/place-photo?photoRef=${restaurant?.photos[0].photo_reference}`;
      }
    },
    fetcher
  );

  const deleteFavourite = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const favouriteRef = doc(db, "favourites", id)
      await deleteDoc(favouriteRef);
    } catch (e) {
      console.error(`Error deleting favourite of id ${id}`)
    }
  }

  return (
    <Skeleton isLoaded={!isLoading}>
      <Card
        className={twMerge(
          "border-1 hover:scale-105 transform transition-all duration-1000 ease-in-out",
          theme === "dark"
            ? "bg-slate-800 border-slate-800 hover:bg-slate-8 00/70"
            : "bg-slate-100 border-slate-200 hover:bg-slate-200/70"
        )}
      >
        <CardBody className="w-full">
          <Skeleton isLoaded={!isImgLoading}>
            <Image
              src={imgUrl}
              className={twMerge(
                "w-full rounded-lg shadow-md",
                theme === "dark" ? "shadow-slate-500/30" : "shadow-slate-300"
              )}
              alt={restaurant?.name}
              width={350}
              height={300}
            />
          </Skeleton>

          <div className="flex flex-col gap-1 py-2 px-1">
            <Link href={`/restaurant/${favourite.restaurantId}`}>
              <h3 className="font-medium text-lg leading-6"> {restaurant?.name} </h3>
            </Link>
            <p className="text-sm">{restaurant?.vicinity}</p>
            <p className="text-xs font-light"> Favourited on: {datetime} </p>
            <Button
              color="danger"
              size="sm"
              variant={theme === "dark" ? "flat" : "solid"}
              isIconOnly
              className="self-end"
              onClick={() => deleteFavourite(id)}
            >
              <TrashAltIcon size={15} />
            </Button>
          </div>

        </CardBody>
      </Card>
    </Skeleton>
  );
};

const NoFavourite = () => {
  
  return (
    <div className="flex flex-col items-center gap-2">
      <p> No favourites yet </p>
      <p> 
        You can favourite any restaurant and it will appear here. 
      </p>
    </div>
  )
};