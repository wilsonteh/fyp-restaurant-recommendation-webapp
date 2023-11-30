"use client";
import useMyMediaQuery from "@/app/_hooks/useMyMediaQuery";
import useQueryParams from "@/app/_hooks/useQueryParams";
import { DollarSign, DoorOpen, Filter, MoneyBill } from "@/app/_icons/Index";
import { priceScales } from "@/app/_utils/constants";
import { FilterOptionsFormData } from "@/app/_utils/interfaces/FormData";
import { Button, Checkbox, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { setTimeout } from "timers";

export default function Filters() {

  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const { lgScreenAbv } = useMyMediaQuery();
  const { handleSubmit, control } = useForm<FilterOptionsFormData>({
     mode: 'onBlur', 
    defaultValues: {}
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(false);  
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
    setIsModalOpen(false);  
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

  const FiltersForm = () => {
    return (
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(handleFilterSubmit)}>
        <h3 className="hidden lg:block text-xl text-center font-medium">Filters</h3>
        <div className="flex flex-col items-start">
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

        <Button color="primary" type="submit">
          Apply filters
        </Button>
      </form>
    )
  };

  const ModalFiltersForm = () => {
    return (
      <div>
        <Button   
          color="secondary"
          variant="ghost"
          onPress={() => setIsModalOpen(!isModalOpen)}
          startContent={<Filter size={15} />}
        >
          Filters
        </Button>

        <Modal
          size="xs"
          placement="center"
          isOpen={isModalOpen}
          onOpenChange={(isOpen) => setIsModalOpen(isOpen)}
          classNames={{
            base: theme === "dark" ? "bg-slate-800" : "bg-slate-100", 
            header: "pb-0",
            body: 'pt-0 pb-6',
            closeButton: theme === "dark" ? "hover:bg-slate-700" : "hover:bg-slate-200",
          }}
        >
          <ModalContent className="">
            <ModalHeader>Filters</ModalHeader>
            <ModalBody>
              <FiltersForm />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    );
  };

  if (!lgScreenAbv) return <ModalFiltersForm />
  return <FiltersForm />
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
          label="Radius"
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
                ? "bg-slate-700 data-[hover]:bg-slate-700"
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
          <div className="flex items-center gap-2">
            <Checkbox
              aria-label="open now filter"
              isSelected={isOpennow === 'true'}
              onChange={onChange} onBlur={onBlur} ref={ref}
              onValueChange={(isSelected) => setIsOpennow(isSelected ? 'true' : null)}
            >
              Open Now
            </Checkbox>
            <DoorOpen size={17} />
          </div>
        </div>
      )}
    />
  );
}

const PricingCheckboxGroup = ({ control }: { control: any }) => {
  
  const searchParams = useSearchParams();
  // const [minprice, setMinprice] = useState<string|null>(searchParams.get('minprice'));
  // const [maxprice, setMaxprice] = useState<string|null>(searchParams.get('maxprice'));

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <span>Pricing </span>
        <MoneyBill size={15} />
      </label>
      { priceScales.map((price, i) => (
        <Controller 
          key={price.number}
          name={`pricing.${price.number}`}
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <div className="flex items-center gap-2 capitalize">
              <Checkbox  
                isSelected={value}
                onChange={onChange} onBlur={onBlur} ref={ref}
              > 
                {price.label} 
              </Checkbox>

              <span className="flex items-center gap-0">
                {Array.from(Array(i+1)).map((_, i) => (
                  <DollarSign key={i} size={15} />
                ))}
              </span>
            </div>
          )}
        />
      ))}
    </div>
  );
}
