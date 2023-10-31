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

export default function ReviewForm() {
  const { restaurantId } = useParams();
  const router = useRouter();
  const [ user ] = useAuthState(auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ReviewFormData>();

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

  const submitReview: SubmitHandler<ReviewFormData> = async (formData) => {
    console.log(formData);
    // TODOs: timestamp, restau ref 
    try {
      const docRef = await insertDoc("reviews", {
        ...formData, 
        author: user?.uid,
        restaurant: restaurantId, 
        createdAt: serverTimestamp(),
      })
      router.push(`/restaurant/${restaurantId}`);
      console.log(`Document ${docRef.id} has been added`);
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
        <label htmlFor="">Rate the restaurant</label>
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
                tooltipArray={[ "Hated it", "Disliked it", "Average", "Good", "Prefect" ]}
                tooltipClassName="!bg-gray-200 !text-gray-800 border-1 border-gray-300 text-xs"
                onClick={onChange} onPointerEnter={onBlur} onPointerLeave={onBlur} onPointerMove={onBlur}
              />
            )}
            rules={{
              required: "Rating cannot be left empty"
            }}
          />
          <span className="text-xs text-red-500"> { errors.rating?.message } </span>
        </div>

        <Input
          fullWidth={false}
          variant="bordered"
          label="Review title"
          labelPlacement="outside"
          placeholder="Give your review a title"
          isRequired={true} onChange={title.onChange} onBlur={title.onBlur} name={title.name} ref={title.ref}
          errorMessage={errors.title?.message}
        />

        <Textarea
          fullWidth={false}
          variant="bordered"
          label="Comment"
          labelPlacement="outside"
          placeholder="Share your experience with the restaurant, from its food, service, pricing, atmosphere"
          isRequired={true}
          onChange={comment.onChange} onBlur={comment.onBlur} name={comment.name} ref={comment.ref}
          errorMessage={errors.comment?.message}
        />

        <DropDownInputs control={control} />
      </div>

      <Button type="submit" color="primary">
        Submit
      </Button>
    </form>
  );
}
