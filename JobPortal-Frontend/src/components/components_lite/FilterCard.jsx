import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",

      "Chennai",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Gandhinagar",
      "Rajkot",
      "Mysore",
      "Remote",
      "On-Site",
      "Hybrid",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Full stack",
      "Node",
      "Python",
      "Java",
      "frontend",
      "backend",
      "mobile",
      "desktop",
    ],
  },

  // {
  //   filterType: "Salary",
  //   array: ["0-50k", "50k-100k", "100k-200k", "200+k"],
  // },

  // {
  //   filterType: "Experience",
  //   array: ["0-3 years", "3-5 years", "5-7years", "7+years"],
  // },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-white rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-bold text-lg">{data.filterType}</h2>
            {data.array.map((item, indx) => {
              const itemId = `Id${index}-${indx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId}></RadioGroupItem>
                  <label htmlFor={itemId}>{item}</label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
