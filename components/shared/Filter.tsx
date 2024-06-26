"use client";

import React, { FunctionComponent } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUrl } from "@/hooks/useUrl";

interface OwnProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

type Props = OwnProps;

const Filter: FunctionComponent<Props> = ({
  filters,
  otherClasses,
  containerClasses,
}) => {
  const { setUrlQuery } = useUrl({
    keyToAdd: "filter",
  });

  return (
    <div className={`relative ${containerClasses}`}>
      <Select onValueChange={(value) => setUrlQuery(value)}>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent
          className={`text-dark100_light900 background-light800_dark300`}
        >
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
