import Image from "next/image";

async function fetchPhotos(photoRefs: String[]) {

  const imageUrls = await Promise.all(photoRefs.map(async (photoRef) => {
    const res = await fetch(`${process.env.HOST_URL}/api/place-photo?photoRef=${photoRef}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch photo of ref: ${photoRef}`);
    }
    return res.json();
  })) as string[];

  return imageUrls;
}

export default async function RestaurantPhotoGrid({ photoRefs }: { photoRefs: String[] }) {

  const imageUrls = await fetchPhotos(photoRefs);
  // console.log("🚀 ~ file: RestaurantPhotoGrid.tsx:18 ~ RestaurantPhotoGrid ~ imageUrls:", imageUrls)

  return (
    <div className="grid grid-cols-4 gap-2">
      { imageUrls.map((imageUrl, index) => (
        <Image
          key={index}
          src={imageUrl}
          width={400}
          height={1600}
          alt="restaurant photo"
          className="w-full h-96 object-cover"
        />
      ))}
    </div>
  );
}