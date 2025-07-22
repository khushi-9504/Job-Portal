import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { CarouselItem, CarouselContent, Carousel } from "../ui/carousel";
import { Button } from "../ui/button";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.jobs);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  // console.log(allJobs);

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }
    const filteredJobs = allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();
      return (
        job.title?.toLowerCase().includes(query) ||
        "" ||
        job.description?.toLowerCase().includes(query) ||
        "" ||
        job.location?.toLowerCase().includes(query) ||
        "" ||
        (typeof job.experience === "string" &&
          job.experience.toLowerCase().includes(query)) ||
        (typeof job.salary === "string" &&
          job.salary.toLowerCase().includes(query))
      );
    });

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  const clearfilter = () => {
    setFilterJobs(allJobs);
  };
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <Carousel>
              <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg-basis-1/3 my-3">
                  <Button onClick={() => clearfilter(() => category)}>
                    CLEAR FILTER
                  </Button>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            //Job
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                    key={job.id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
