import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const {allJobs} = useSelector((store)=>store.job);
  return (
    <>
      <div className="max-w-7xl mx-auto my-20 px-4">
        <h1 className="text-4xl font-bold text-[#6A38C2] text-center mb-8">
          <span>Latest & Top</span> Job Openings
        </h1>

        {/* Grid to display 3 job cards per row */}
        <div className="grid grid-cols-3  gap-6">
          {
          allJobs.length <= 0 ?<span>No Job Available </span>: allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
          }
        </div>
      </div>
    </>
  );
};

export default LatestJobs;
