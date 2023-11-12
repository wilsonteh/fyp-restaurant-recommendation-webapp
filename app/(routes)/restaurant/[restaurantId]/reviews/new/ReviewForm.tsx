"use client";
import { ReviewFormData } from "@/app/_utils/interfaces/FormData";
import { Button, Input, Textarea, user } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DropDownInputs from "./DropDownInputs";
import { insertDoc } from "@/app/_firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/_firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import FilesDropzone from "../../FilesDropzone";
import { useEffect, useState } from "react";
import { ImagePreview } from "@/app/_utils/interfaces/Interfaces";
import { useUploadFile } from 'react-firebase-hooks/storage';
import { ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { getImageUrls, storage } from "@/app/_firebase/storage";
import RatingInput from "./RatingInput";

export default function ReviewForm() {
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
      className="border-2 px-6 py-4 flex flex-col gap-4"
    >
      <h1 className="font-medium text-lg text-center">
        Submit review for RATA Restaurant @ SS15 Subang Jaya
      </h1>

      <div className="flex flex-col gap-4">
        <div>
          <RatingInput
            name="rating.main"
            label="Rate the restaurant"
            maxWidth={220}
            control={control}
            errors={errors}
            required
          />
        </div>

        <div className="flex flex-col gap-4">
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
              label="Restaurant atmosphere"
              maxWidth={170}
              control={control}
              errors={errors}
            />
          </div>
        </div>

        <Input
          fullWidth={false}
          variant="bordered"
          label="Review title"
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
          fullWidth={false}
          variant="bordered"
          label="Comment"
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

      <Button
        type="submit"
        color="primary"
        isLoading={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
