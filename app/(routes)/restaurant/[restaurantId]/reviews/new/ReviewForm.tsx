"use client";
import { auth } from "@/app/_firebase/auth";
import { insertDoc } from "@/app/_firebase/firestore";
import { getImageUrls, storage } from "@/app/_firebase/storage";
import { ReviewFormData } from "@/app/_utils/interfaces/FormData";
import { ImagePreview } from "@/app/_utils/interfaces/Interfaces";
import { Button, Input, Textarea } from "@nextui-org/react";
import { serverTimestamp } from "firebase/firestore";
import { ref } from 'firebase/storage';
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUploadFile } from 'react-firebase-hooks/storage';
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import FilesDropzone from "../../FilesDropzone";
import DropDownInputs from "./DropDownInputs";
import RatingInput from "./RatingInput";
import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import Link from "next/link";

export default function ReviewForm(restaurant: RestaurantDetailInterface) {
  const { restaurantId } = useParams();
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<ImagePreview[]>([]);
  const [ user ] = useAuthState(auth)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    control,
  } = useForm<ReviewFormData>({
    mode: 'onBlur', 
    defaultValues: {
      rating: {
        main: 0, food: 0, service: 0, value: 0, atmosphere: 0
      }
    }
  });
  const [uploadFile, uploading, snapshot, error] = useUploadFile()

  const titleReg = register("title", {
    required: "Title cannot be left empty",
  });

  const commentReg = register("comment", {
    required: "Comment cannot be left empty",
    validate: {
      length: (comment) =>
        comment.length >= 10 || "Comment should be at least 10 characters long",
    },
  });

  const uploadImages = async () => {
    try {
      const imagePaths = await Promise.all(uploadedFiles.map(async (file) => {
        const uniqueName = `${uuidv4()}-${file.name}`;
        const imagePath = `reviews/${uniqueName}`;
        const storageRef = ref(storage, imagePath);
        const result = await uploadFile(storageRef, file);
        return imagePath;
      }));
      return imagePaths;
    } catch (e) {
      console.error(`Error uploading images to storage`, e);
    }
  };

  const submitReview: SubmitHandler<ReviewFormData> = async (formData) => {
    console.log(formData);
    try {
      const imagePaths = await uploadImages();
      const imageUrls = await getImageUrls(imagePaths!);
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
      router.push(`/restaurant/${restaurantId}`);

    } catch (e) {
      console.error(e);
    } 
  };

  return (
    <form
      onSubmit={handleSubmit(submitReview)}
      className="xs:px-6 py-4 flex flex-col gap-4"
    >
      <h1 className="font-medium text-lg text-center">
        <span>Submit review for </span>
        <Link
          href={`/restaurant/${restaurantId}`}
          className="font-semibold hover:text-gray-500"
        >
          {restaurant.name}
        </Link>
      </h1>

      <div className="all-inputs flex flex-col gap-4">
        <div className="main-rating flex">
          <RatingInput
            name="rating.main"
            label="Rate the restaurant"
            maxWidth={220}
            control={control}
            errors={errors}
            required
          />
        </div>

        <div className="sub-ratings flex flex-col gap-4">
          <div className="flex gap-12">
            <RatingInput
              name="rating.food"
              label="Food"
              maxWidth={170}
              control={control}
              errors={errors}
            />

            <RatingInput
              name="rating.service"
              label="Service"
              maxWidth={170}
              control={control}
              errors={errors}
            />
          </div>

          <div className="flex gap-12">
            <RatingInput
              name="rating.value"
              label="Value for money"
              maxWidth={170}
              control={control}
              errors={errors}
            />

            <RatingInput
              name="rating.atmosphere"
              label="Atmosphere"
              maxWidth={170}
              control={control}
              errors={errors}
            />
          </div>
        </div>

        <Input
          label="Review title"
          fullWidth={false}
          variant="bordered"
          labelPlacement="outside"
          placeholder="Give your review a title"
          isRequired={true}
          onChange={titleReg.onChange}
          onBlur={titleReg.onBlur}
          name={titleReg.name}
          ref={titleReg.ref}
          errorMessage={errors.title?.message}
        />

        <Textarea
          label="Comment"
          fullWidth={false}
          variant="bordered"
          labelPlacement="outside"
          placeholder="Share your experience with the restaurant, from its food, service, pricing, atmosphere"
          isRequired={true}
          onChange={commentReg.onChange}
          onBlur={commentReg.onBlur}
          name={commentReg.name}
          ref={commentReg.ref}
          errorMessage={errors.comment?.message}
        />

        <DropDownInputs control={control} />

        <FilesDropzone
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </div>

      <Button type="submit" color="primary" size="lg" isLoading={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
