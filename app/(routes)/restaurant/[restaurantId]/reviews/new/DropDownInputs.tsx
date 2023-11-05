"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { Controller } from "react-hook-form";

export default function DropDownInputs({ control }: any ) {

  const priceLevels = [
    "RM 1 - 15",
    "RM 15 - 30",
    "RM 30 - 45",
    "RM 45 - 60",
    "RM 60 - 75",
    "RM 75 - 90",
    "RM 90++",
  ];
  const options = ['Yes', 'No', 'Unsure']

  return (
    <div className="flex flex-col gap-4">
      <Controller
        name="priceLevel"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            variant="bordered"
            label="How much did you spend (on average) per person?"
            labelPlacement="outside"
            placeholder="Select price level"
            value={value}
            onChange={onChange} onBlur={onBlur}
          >
            {priceLevels.map((price) => (
              <SelectItem key={price} value={price}>
                {price}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <div className="flex gap-8">
        <Controller
          name="hasHalalOption"
          control={control}
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select
            variant="bordered"
            label="Does this restaurant offers halal food?"
            labelPlacement="outside"
            placeholder="Select option"
            value={value}
            onChange={onChange} onBlur={onBlur}
            >
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
          )}
        />
        
        <Controller
          name="hasVegetarianOption"
          control={control}
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select
              variant="bordered"
              label="Does this restaurant offers vegetarian food?"
              labelPlacement="outside"
              placeholder="Select option"
              value={value}
              onChange={onChange} onBlur={onBlur}
            >
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>
    </div>
  );
}
