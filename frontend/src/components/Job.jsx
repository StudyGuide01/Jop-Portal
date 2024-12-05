import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

const Job = ({ job }) => {
  // Function to calculate the number of days since the job was posted
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // days
  };

  // Return "Job Not Found" if job is undefined
  if (!job) {
    return <div>Job not found</div>;
  }

  const daysAgo = job?.createdAt ? daysAgoFunction(job.createdAt) : 0;

  return (
    <div className="rounded-md shadow-xl bg-white border border-gray-100 p-5 w-80">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
        </p>
        <Button
          variant="outline"
          className="bg-none hover:bg-none hover:bg-[#f0f0f0] bg-[#f0f0f0] bg-opacity-30 hover:bg-opacity-30 text-black rounded-full"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2 ml-[-20px]">
        <Avatar>
          <AvatarImage
            src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
            className="w-20 h-20"
            alt="Company Logo"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.companyName}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#720B90] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="mt-5 flex gap-5">
        <Button variant="outline">
          <Link to={`/description/${job?._id}`}>Details</Link>
        </Button>
        <Button className="bg-[#7209b7]">Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;
