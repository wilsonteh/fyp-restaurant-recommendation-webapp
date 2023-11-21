"use client";
import useQueryParams from "@/app/_hooks/useQueryParams";
import DollarSign from "@/app/_icons/dollar-sign";
import { priceScales } from "@/app/_utils/constants";
import { Button, Checkbox, CheckboxGroup, Select, SelectItem, Switch } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { setTimeout } from "timers";

export default function Filters() {

  const searchParams = useSearchParams();
  const { queryParams, setQueryParams } = useQueryParams<{
    q?: string;
    distance?: string;
    openNow?: boolean;
    minprice?: string;
    maxprice?: string;
    sortby?: string;
  }>();
  const [hasFilter, setHasFilter] = useState(false);  // to check whether there's any filter applied
  const filterKeys = useMemo(() => ['distance', 'opennow', 'minprice', 'maxprice'], []);

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
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-medium">Filters</h3>
        { hasFilter && (
          <Button
            color="secondary"
            variant="light"
            className="!bg-transparent hover:bg-transparent hover:underline"
            onClick={clearAllFilters}
          >
            Clear all filters
          </Button>
        )}
      </div>

      <DistanceSelect queryParams={queryParams} setQueryParams={setQueryParams} />
      <OpenNowSwitch queryParams={queryParams} setQueryParams={setQueryParams} />
      <PricingCheckboxGroup queryParams={queryParams} setQueryParams={setQueryParams} />
    </div>
  );
};

const DistanceSelect = ({ queryParams, setQueryParams }: { queryParams: URLSearchParams | undefined, setQueryParams: (params: any) => void }) => {

  const searchParams = useSearchParams();
  const key = "distance";
  const distances = [
    { key: "3km", value: 3000 },
    { key: "5km", value: 5000 },
    { key: "10km", value: 10000 },
    { key: "15km", value: 15000 },
  ];
  const [distanceKey, setDistanceKey] = useState<string|undefined>(undefined);

  const onDistanceKeyChange = useCallback(
    (distKey: string) => {
      // when filter is deselected, remove the 'distance' search params from url
      // but at the same time remain all other search params
      // when filter is selected, add on the 'distance' search params to url
      // but at the same time remain all other search params
      setDistanceKey(distKey);
      console.log("🚀 distKey:", distKey)
      let distanceFilter = queryParams?.get(key);
      if (distKey === distanceFilter || !distKey) {
        // remove 'distance' search params key from url
        setQueryParams({
          [key]: undefined,   // [key] is becoz `key` is a variable
        });
        return;
      }
      setQueryParams({ [key]: distKey });
    },
    [queryParams, setQueryParams]
  );

  useEffect(() => {
    // make the select input value & search param in url in sync
    if (searchParams.has(key)) {
      setDistanceKey(searchParams.get(key) as string);
    }
  }, [searchParams])

  return (
    <Select
      label="Distance filter"
      labelPlacement="outside"
      placeholder="Select distance"
      // *! FIXME: problem here!
      selectedKeys={distanceKey ? [distanceKey] : undefined}
      onChange={(e) => setDistanceKey(e.target.value)}
      onSelectionChange={(keys) => onDistanceKeyChange(Array.from(keys)[0] as string)}
    >
      {distances.map((distance) => (
        <SelectItem key={distance.value}>
          { distance.key }
        </SelectItem>
      ))}
    </Select>
  );
};

const OpenNowSwitch = ({ queryParams, setQueryParams }: { queryParams: URLSearchParams | undefined, setQueryParams: (params: any) => void }) => {

  const searchParams = useSearchParams();
  const key = 'opennow'
  const [openNow, setOpenNow] = useState(false);

  const onSwitchChange = useCallback(
    (isSelected: boolean) => {
      setOpenNow(isSelected)
      let openNowFilter = queryParams?.get(key);
      // coz the 'true' 'false' is in string format 
      let isOpenNow = openNowFilter === "true" ? true : false;
      if (isSelected === isOpenNow || !isSelected) {
        setQueryParams({ [key]: undefined })
        return;
      }
      setQueryParams({ [key]: isSelected });
    },
    [queryParams, setQueryParams]
  );

  useEffect(() => {
    // make the select input value & search param in url in sync
    if (searchParams.has(key)) {
      let isOpenNow = searchParams.get(key) === "true" ? true : false; 
      setOpenNow(isOpenNow);
    }
  }, [searchParams])

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="" className="text-sm font-medium">Open Now</label>
      <Checkbox
        aria-label="open now filter"
        isSelected={openNow}
        onValueChange={onSwitchChange}
      >
        Open Now
      </Checkbox>
    </div>
  );
}

const PricingCheckboxGroup = ({ queryParams, setQueryParams }: { queryParams: URLSearchParams | undefined, setQueryParams: (params: any) => void }) => {
  
  const searchParams = useSearchParams();
  const key1 = 'minprice';
  const key2 = 'maxprice';
  const [priceValues, setPriceValues] = useState<string[]>([]);

  useEffect(() => {
    // make the checkboxes group & search param in url in sync
    if (searchParams.has(key1) && searchParams.has(key2)) {
      let minPrice = searchParams.get(key1)!;
      let maxPrice = searchParams.get(key2)!;

      let values = [];
      if (minPrice <= maxPrice) {
        for (let i=Number(minPrice); i <= Number(maxPrice); i++) {
          values.push(i);
        }
        setPriceValues(values.map(v => v.toString()));
      }
    }
  }, [searchParams])
  
  const onCheckboxChange = useCallback(
    (values: string[]) => {
      setPriceValues(values);
      let minPrice = queryParams?.get(key1);
      let maxPrice = queryParams?.get(key2);
      // sort the values arr in asc order 
      values.sort((a, b) => parseInt(a) - parseInt(b));

      // remove params from url if user deselects all checkboxes
      if (values.length === 0) {
        setQueryParams({ [key1]: undefined, [key2]: undefined });
        return;
      }
      // the line below is correct, as long as the values arr is sorted in asc order
      setQueryParams({ [key1]: values[0], [key2]: values[values.length - 1] })
    },
    [queryParams, setQueryParams]
  );

  return (
    <CheckboxGroup
      label="Pricing"
      classNames={{
        label: "text-sm font-medium",
      }}
      onChange={(values) => onCheckboxChange(values as string[])}
      value={priceValues}
    >
      {priceScales.map((price) => (
        <div key={price.label} className="flex items-center gap-1">
          <Checkbox value={price.number.toString()}>
            {price.label}
          </Checkbox>
          <span className="flex items-center gap-0">
            {Array.from(Array(price.number+1).keys()).map((_, i) => (
              <DollarSign key={i} size={10} />
            ))}
          </span>
        </div>
        
      ))}
    </CheckboxGroup>
  );
}
