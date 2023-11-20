"use client";
import useQueryParams from "@/app/_hooks/useQueryParams";
import { Select, SelectItem, Switch } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Filters() {

  const { queryParams, setQueryParams } = useQueryParams<{
    distance?: string;
    openNow?: boolean;
  }>();

  return (
    <div className="flex flex-col gap-8">
      <DistanceSelect queryParams={queryParams} setQueryParams={setQueryParams} />
      <OpenNowSwitch queryParams={queryParams} setQueryParams={setQueryParams} />
    </div>
  );
};

const DistanceSelect = ({ queryParams, setQueryParams }: { queryParams: URLSearchParams | undefined, setQueryParams: (params: any) => void }) => {

  const searchParams = useSearchParams();
  const key = "distance";
  const [distanceKey, setDistanceKey] = useState<string>("3km");
  const distances = [
    { key: "3km", value: 3000 },
    { key: "5km", value: 5000 },
    { key: "10km", value: 10000 },
    { key: "15km", value: 15000 },
  ];

  const onDistanceKeyChange = useCallback(
    (distKey: string) => {
      // when filter is deselected, remove the 'distance' search params from url
      // but at the same time remain all other search params
      // when filter is selected, add on the 'distance' search params to url
      // but at the same time remain all other search params
      setDistanceKey(distKey);
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
      className="max-w-[200px]"
      selectedKeys={[distanceKey]}
      onChange={(e) => setDistanceKey(e.target.value)}
      onSelectionChange={(keys) => onDistanceKeyChange(Array.from(keys)[0] as string)}
    >
      {distances.map((distance) => (
        <SelectItem key={distance.value} value={distance.value}>
          { distance.key }
        </SelectItem>
      ))}
    </Select>
  );
};

const OpenNowSwitch = ({ queryParams, setQueryParams } : { queryParams: URLSearchParams | undefined; setQueryParams: (params: any) => void }) => {

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
    <Switch
      aria-label="open now filter"
      isSelected={openNow}
      onValueChange={onSwitchChange}
    >
      Open Now
    </Switch>
  );
}