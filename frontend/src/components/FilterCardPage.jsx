import { Label } from "@radix-ui/react-label";
import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lakh", "1lakh-5lakh"],
  },
];

const FilterCardPage = () => {
  return (
    <>
      <div className="w-full bg-white p-3 rounded-md">
        <h1 className="font-bold text-lg ">Filter Jobs</h1>
        <hr className="mt-3" />
        <RadioGroup>
          {filterData.map((data, index) => (
            <div key={index}>
              <h2 className="font-bold text-lg">{data.filterType}</h2>
              {data.array.map((item, index) => {
                const id = `${data.filterType}-${item}`; // Unique id for each radio button
                return (
                  <div key={index} className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={item} id={id} name={data.filterType} />
                    <Label htmlFor={id}>{item}</Label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

export default FilterCardPage;
