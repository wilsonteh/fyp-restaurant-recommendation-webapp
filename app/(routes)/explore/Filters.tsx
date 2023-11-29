"use client";
import useQueryParams from "@/app/_hooks/useQueryParams";
import { DollarSign } from "@/app/_icons/Index";
import { priceScales } from "@/app/_utils/constants";
import { FilterOptionsFormData } from "@/app/_utils/interfaces/FormData";
import { Button, Checkbox, CheckboxGroup, Select, SelectItem } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { setTimeout } from "timers";

export default function Filters() {

  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    control,
  } = useForm<FilterOptionsFormData>({
    mode: 'onBlur', 
    defaultValues: {
      // radius: "5000", 
      // opennow: false, 
      // pricing: {
      //   '0': false, '1': false, '2': false, '3': false, '4': false
      // }
    }
  });
  const { queryParams, setQueryParams } = useQueryParams<{
    q?: string;
    radius?: string;
    opennow?: boolean;
    minprice?: string;
    maxprice?: string;
    sortby?: string;
  }>();
  const [hasFilter, setHasFilter] = useState(false);  // to check whether there's any filter applied
  const filterKeys = useMemo(() => ['radius', 'opennow', 'minprice', 'maxprice'], []);

  useEffect(() => {
    function checkHasFilter() {
      for (let key of filterKeys) {
        if (searchParams.has(key)) {
          setHasFilter(true);
          return;
        }
      }
      setHasFilter(false);
    }
    checkHasFilter();

  }, [filterKeys, searchParams])
  

  const clearAllFilters = () => {
    for (let key of filterKeys) {
      if (searchParams.has(key)) {
        setQueryParams({ [key]: undefined });
      }
    }
    // *NOTE: not the best way, but works for now
    // give some time for the url to update its search params, then perform client side refresh
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  const handleFilterSubmit: SubmitHandler<FilterOptionsFormData> = async (formData) => {
    console.log(formData)
    const { radius, opennow, pricing } = formData;
    // get minprice & maxprice
    const trueKeys = Object.keys(pricing).filter(key => pricing[key]).map(Number);
    const minprice = trueKeys.length === 0 ? false : Math.min(...trueKeys).toString();
    const maxprice = trueKeys.length === 0 ? false : Math.max(...trueKeys).toString();

    // add filters to url as search params 
    setQueryParams({ 
      radius: radius === '' ? undefined : radius, 
      opennow: opennow ? opennow : undefined, 
      minprice: minprice ? minprice : undefined, 
      maxprice: maxprice ? maxprice : undefined 
    });
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(handleFilterSubmit)}>
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium">Filters</h3>
        { hasFilter && (
          <Button
            color={theme === 'dark' ? 'primary' : 'secondary'}
            variant="light"
            className="!bg-transparent hover:bg-transparent hover:underline"
            onClick={clearAllFilters}
          >
            Clear all filters
          </Button>
        )}
      </div>

      <RadiusSelect control={control} />
      <OpenNowSwitch control={control} />
      <PricingCheckboxGroup control={control} /> 

      <Button color="primary" type="submit">Apply filters</Button>
    </form>
  );
};

const RadiusSelect = ({ control }: { control: any }) => {

  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const radius = [
    { key: "3km", value: 3000 },
    { key: "5km", value: 5000 },
    { key: "10km", value: 10000 },
    { key: "15km", value: 15000 },
  ];
  const [radiusValue, setRadiusValue] = useState<string|null>(searchParams.get('radius'));

  const onRadiusKeyChange = (keys: any) => {
    const radValue = Array.from(keys)[0] as string
    setRadiusValue(radValue)
  }

  return (
    <Controller
      name="radius"
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Select
          label="Radius filter"
          labelPlacement="outside"
          value={value}
          placeholder="Select radius"
          selectedKeys={radiusValue ? [radiusValue] : undefined}
          onChange={onChange} onBlur={onBlur} ref={ref}
          onSelectionChange={(keys) =>  onRadiusKeyChange(keys)}
          classNames={{
            // the select input
            trigger: twMerge(
              theme === "dark"
                ? "bg-slate-800 data-[hover]:bg-slate-700"
                : "bg-white data-[hover]:bg-slate-50"
            ),
            // dropdown contents
            popoverContent: twMerge(
              theme === "dark" ? "bg-slate-800" : "bg-white"
            ),
          }}
        >
          {radius.map((r) => (
            <SelectItem
              key={r.value}
              value={r.value}
              classNames={{
                base: twMerge(
                  theme === "dark"
                    ? "data-[hover]:!bg-slate-700 data-[focus]:!bg-slate-700"
                    : "data-[hover]:!bg-slate-200 data-[focus]:!bg-slate-200"
                ),
              }}
            >
              {r.key}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

const OpenNowSwitch = ({ control }: { control: any }) => {

  const searchParams = useSearchParams();
  const [isOpennow, setIsOpennow] = useState<string|null>(searchParams.get('opennow'));

  return (
    <Controller
      name="opennow"
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-sm font-medium">
            Open Now
          </label>
          <Checkbox
            aria-label="open now filter"
            isSelected={isOpennow === 'true'}
            onChange={onChange} onBlur={onBlur} ref={ref}
            onValueChange={(isSelected) => setIsOpennow(isSelected ? 'true' : null)}
          >
            Open Now
          </Checkbox>
        </div>
      )}
    />
  );
}

const PricingCheckboxGroup = ({ control }: { control: any }) => {
  
  const searchParams = useSearchParams();
  const [minprice, setMinprice] = useState<string|null>(searchParams.get('minprice'));
  const [maxprice, setMaxprice] = useState<string|null>(searchParams.get('maxprice'));

  const onCheckboxChange = (isSelected: boolean, i: number) => {
    // console.log(isSelected, i)
  }

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm font-medium"> Pricing </h3>
      { priceScales.map((price, i) => (
        <Controller 
          key={price.number}
          name={`pricing.${price.number}`}
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <div className="flex items-center gap-1">
              <Checkbox  
                isSelected={value}
                onChange={onChange} onBlur={onBlur} ref={ref}
                onValueChange={(isSelected) => onCheckboxChange(isSelected, i)}
              > 
                {price.label} 
              </Checkbox>

              <span className="flex items-center gap-0">
                {Array.from(Array(price.number + 1).keys()).map((_, i) => (
                  <DollarSign key={i} size={10} />
                ))}
              </span>
            </div>
          )}
        />
      ))}
    </div>
  );
}
