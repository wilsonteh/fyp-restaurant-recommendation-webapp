"use client";
import { Select, SelectItem } from "@nextui-org/react";

export default function DropDownInputs() {
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
      <Select
        variant="bordered"
        label="How much did you spend (on average) per person?"
        labelPlacement="outside"
        placeholder="Select price level"
      >
        {priceLevels.map((price) => (
          <SelectItem key={price} value={price}>
            {price}
          </SelectItem>
        ))}
      </Select>

      <div className="flex gap-8">
        <Select
          variant="bordered"
          label="Does this restaurant offers halal food?"
          labelPlacement="outside"
          placeholder="Select option"
        >
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </Select>

        <Select
          variant="bordered"
          label="Does this restaurant offers vegetarian food?"
          labelPlacement="outside"
          placeholder="Select option"
        >
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
