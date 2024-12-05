import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileBox from "./UpdateProfileBox";
import { useSelector } from "react-redux";

// const skills = ["html", "css", "javascript", "reactjs"];

const Profile = () => {
  const [open, setOpen] = useState(false);
  const {user} = useSelector((store)=>store.auth);
  const isResume = true;
  return (
    <>
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <Avatar>
                  {/* Change the size to a valid value in Tailwind CSS */}
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profile/photo"
                    className="w-20 h-20 rounded-full" // Valid Tailwind classes
                  />
                </Avatar>
              </div>

              <div>
                <h1 className="font-medium text-xl">{user?.fullName}</h1>
                <p>
                  {user?.profile?.bio}
                </p>
              </div>
            </div>
            <div>
              <Button onClick={()=>setOpen(true)} className="text-right" variant="outline">
                <Pen />
              </Button>
            </div>
          </div>

          <div className="space-y-3 my-5">
            <div className="flex items-center gap-3">
              <Mail />
              <span>{user?.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Contact />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>

          <div>
            <h1>Skills</h1>
            <div className="flex items-center gap-1">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className={`ml-2 ${index === 0 ? "ml-0" : ""}`}
                  >
                    {item.toUpperCase()}
                  </Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap -1.5">
            <Label className="text-md font-bold ">Resume </Label>
            {isResume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
               {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="max-w-4xl  mx-auto bg-white rounded-2xl">
          <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
          {/* APPLICATION TABLE */}
          <AppliedJobTable />
        </div>
<UpdateProfileBox open={open} setOpen={setOpen}/>

      </div>
    </>
  );
};

export default Profile;
