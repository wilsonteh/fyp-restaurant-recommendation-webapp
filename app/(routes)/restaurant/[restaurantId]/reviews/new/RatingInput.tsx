"use client";
import { ReviewFormData } from '@/app/_utils/interfaces/FormData';
import { ItemStyles, Star, Rating as StarRating, ThinRoundedStar, ThinStar } from '@smastrom/react-rating';
import { Control, Controller, FieldErrors } from "react-hook-form";

export default function RatingInput({
  control, 
  errors, 
  label, 
  name, 
  maxWidth, 
  required, 
} : {
  control: Control<ReviewFormData, any>;
  errors: FieldErrors<ReviewFormData>;
  label: string;
  name: 'rating.main' | 'rating.food' | 'rating.service' | 'rating.value' | 'rating.atmosphere';
  maxWidth?: number; 
  required?: boolean;
}) {

  // to get "food" from "rating.food" 
  const item = name.split('.')[1]
  const ratingStyles: ItemStyles = {
    itemShapes: name === "rating.main" ? Star : ThinStar, 
    itemStrokeWidth: 1, 
    activeFillColor: ['#dc2626', '#f97316', '#facc15', '#a3e635', '#22c55e'],
    activeStrokeColor: ['#c42727', '#e9680c', '#eabd0b', '#95db24', '#23a954'],
    inactiveFillColor: 'white',
    inactiveStrokeColor: '#c1c1c1', 
  }
  
  return (
    <div className="flex flex-col items-start">
      <label htmlFor="" className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name={name}
          rules={{
            validate: (rating) => {
              if (required && rating === 0) {
                return "Rating cannot be left empty";
              }
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <StarRating
              value={value}
              style={{ maxWidth: maxWidth || 200 }}
              itemStyles={ratingStyles}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {errors.rating?.main && name === 'rating.main' && (
          <span className="text-xs text-red-500">
            { errors.rating?.main?.message }
          </span>
        )}
      </div>
    </div>
  );
}
