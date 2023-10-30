import RestaurantCard from "./RestaurantCard";
import ReviewForm from "./ReviewForm";

// async function fetchRestaurantInfo(placeId: string) {
//   const res = await fetch(`${process.env.HOST_URL}/api/place-detail?placeId=${placeId}`);
//   if (!res.ok) {
//     throw new Error(`Failed to fetch restaurant of id: ${placeId}`);
//   }
//   return res.json();
// }

// async function fetchImageUrls(photoRefs: String[]) {
//   const imageUrls = await Promise.all(photoRefs.map(async (photoRef) => {
//     const res = await fetch(`${process.env.HOST_URL}/api/place-photo?photoRef=${photoRef}`);
//     if (!res.ok) {
//       throw new Error(`Failed to fetch photo of ref: ${photoRef}`);
//     }
//     return res.json();
//   })) as string[];

//   return imageUrls;
// }

export default async function ReviewFormPage() {
  
  return (
    <div className="border-2 flex gap-4">
      <section className="w-1/3">
        <RestaurantCard />
      </section>
      <section className="w-2/3">
        <ReviewForm />
      </section>
    </div>  
  );
}