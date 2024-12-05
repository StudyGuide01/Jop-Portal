import React from "react";
import Navbar from "./shared/Navbar";
import FilterCardPage from "./FilterCardPage";
import Job from "./Job";
import { useSelector } from "react-redux";

const JobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const {allJobs} = useSelector((store)=>store.job);
  return (
    <>
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto mt-5">
          <div className="flex gap-5">
            <div className="w-[20%]">
              {/* Filter page */}
              <FilterCardPage />
            </div>

            <div className="">
              {/* Job posting card */}
              {JobsArray.length <= 0 ? (
                <span>Job not found</span>
              ) : (
                <div className="flex-1 h-[88vh] overflow-y-auto overflow-x-hidden pb-5">
                  <div className="grid grid-cols-3 gap-4">
                    {allJobs.length <= 0 ? <span>No Job Available </span>:allJobs.map((job) => (
                      <div>
                        <Job key={job._id} jobId={job} job={job} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
