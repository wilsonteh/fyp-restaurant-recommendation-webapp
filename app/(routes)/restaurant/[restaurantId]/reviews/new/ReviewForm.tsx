"use client";
import { ReviewFormData } from "@/app/_utils/interfaces/FormData";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Rating as StarRating } from "react-simple-star-rating";
import DropDownInputs from "./DropDownInputs";
import { insertDoc } from "@/app/_firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/_firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import FilesDropzone from "../../FileUpload";
import { useEffect, useState } from "react";
import { ImagePreview } from "@/app/_utils/interfaces/Interfaces";
import { useUploadFile } from 'react-firebase-hooks/storage';
import { ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { getImageUrls, storage } from "@/app/_firebase/storage";

export default function ReviewForm() {
  const { restaurantId } = useParams();
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<ImagePreview[]>([]);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  console.log("🚀", uploadedFiles)
  const [ user ] = useAuthState(auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ReviewFormData>();
  const [uploadFile, uploading, snapshot, error] = useUploadFile()

  const title = register("title", {
    required: "Title cannot be left empty",
  });

  const comment = register("comment", {
    required: "Comment cannot be left empty",
    validate: {
      length: (comment) =>
        comment.length >= 10 || "Comment should be at least 10 characters long",
    },
  });

  const uploadImages = async () => {
    const imagePaths = []
    try {
      for (let file of uploadedFiles) {
        const uniqueName = `${uuidv4()}-${file.name}`;
        const imagePath = `reviews/${uniqueName}`;
        const storageRef = ref(storage, imagePath);
        const result = await uploadFile(storageRef, file);
        imagePaths.push(imagePath)
        return imagePaths;
      }
    } catch (e) {
      console.error(`Error uploading images to storage`, e);
    }
  };

  const submitReview: SubmitHandler<ReviewFormData> = async (formData) => {
    console.log(formData);
    setIsFormSubmitting(true);
    try {
      const imagePaths = await uploadImages();
      const imageUrls = await getImageUrls(imagePaths!);
      router.push(`/restaurant/${restaurantId}`);
      const reviewData = {
        ...formData, 
        imageUrls, 
        user: {
          id: user!.uid,
          displayName: user!.displayName,
          avatarUrl: user!.photoURL,
        },
        restaurantId: restaurantId, 
        createdAt: serverTimestamp(),
        likes: {
          count: 0, 
          likedBy: []
        }, 
      }
      console.log("reviewData", reviewData);
      const docRef = await insertDoc("reviews", reviewData);
      console.log(`Document ${docRef.id} has been added`);
      setIsFormSubmitting(false);
      
    } catch (e) {
      console.error(e);
    } 
  };

  return (
    <form
      onSubmit={handleSubmit(submitReview)}
      className="border-2 px-6 py-4 flex flex-col gap-4"
    >
      {/* <button
        className="bg-slate-400 w-fit px-2 py-1 rounded-full"
        onClick={uploadImages}
      >
        Upload files
      </button> */}

      <h1 className="font-medium text-lg text-center">
        Submit review for RATA Restaurant @ SS15 Subang Jaya
      </h1>

      <div className="flex flex-col gap-4">
        <label htmlFor="" className="text-sm font-medium">
          Rate the restaurant
          <span className="text-red-500"> *</span>
        </label>
        <div className="flex flex-col gap-2">
          <Controller
            name="rating"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <StarRating
                initialValue={0}
                size={50}
                transition={true}
                SVGclassName="inline-block px-[6px]"
                SVGstrokeColor="#fb923c"
                SVGstorkeWidth={1.5}
                fillColor="#fb923c"
                emptyColor="transparent"
                showTooltip={true}
                tooltipDefaultText="No rating"
                tooltipArray={[
                  "Hated it",
                  "Disliked it",
                  "Average",
                  "Good",
                  "Prefect",
                ]}
                tooltipClassName="!bg-gray-200 !text-gray-800 border-1 border-gray-300 text-xs"
                onClick={onChange}
                onPointerEnter={onBlur}
                onPointerLeave={onBlur}
                onPointerMove={onBlur}
              />
            )}
            rules={{
              required: "Rating cannot be left empty",
            }}
          />
          <span className="text-xs text-red-500">{errors.rating?.message}</span>
        </div>

        <Input
          fullWidth={false}
          variant="bordered"
          label="Review title"
          labelPlacement="outside"
          placeholder="Give your review a title"
          isRequired={true}
          onChange={title.onChange}
          onBlur={title.onBlur}
          name={title.name}
          ref={title.ref}
          errorMessage={errors.title?.message}
        />

        <Textarea
          fullWidth={false}
          variant="bordered"
          label="Comment"
          labelPlacement="outside"
          placeholder="Share your experience with the restaurant, from its food, service, pricing, atmosphere"
          isRequired={true}
          onChange={comment.onChange}
          onBlur={comment.onBlur}
          name={comment.name}
          ref={comment.ref}
          errorMessage={errors.comment?.message}
        />

        <DropDownInputs control={control} />

        <FilesDropzone
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </div>

      <Button type="submit" color="primary" isDisabled={isFormSubmitting}>
        { isFormSubmitting ? 'Loading...' : 'Submit'}
      </Button>
    </form>
  );
}
