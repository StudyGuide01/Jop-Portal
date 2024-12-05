import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../button"; // Assuming Button is correctly imported
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINTS } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/reduxStore/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const { user } = useSelector((store) => store.auth);
  // const user = false;

  const handleLogout =async()=>{
    try {
      const response = await axios.get(`${USER_API_END_POINTS}/logout`);
      if(response.data.success){
        dispatch(setUser(null));
        navigate('/');
        
        toast.success(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }

  }
  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {/* Left Section (Logo) */}
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portl</span>
          </h1>
        </div>

        {/* Navbar Links and Avatar */}
        <div className="flex items-center gap-5">
          {/* Navbar Links (using react-router-dom Link) */}
          <ul className="flex font-medium items-center gap-5">
            <li>
              <Link to={"/"}> Home</Link>
            </li>
            <li>
              <Link to={"/jobs"}>Jobs</Link>
            </li>
            <li>
              <Link to={"/browse"}>Browse</Link>
            </li>
          </ul>

          {!user ? (
            <div>
              <Link to={"/login"}>
                <Button className="mr-5">Login</Button>
              </Link>
              <Link to={"/signup"}>
                {" "}
                <Button>Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover className="cursor-pointer">
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                    className="w-10 h-10 rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="p-4 mt-3  bg-white shadow-lg rounded-md outline-none">
                <div className="flex gap-3  space-y-2 flex-1">
                 
                 <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                      className="w-10 h-10 rounded-full mt-2"
                    />
                  </Avatar>
                 
                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                   {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="flex flex-col my-3 gap-3">
                  <div className="flex gap-2 items-center">
                    {/* <Button>View Profile</Button> */}
                   <User2 />
                  <h2 className="hover:border-b-2 hover:border-gray-400 hover:pb-1 cursor-pointer">
                  <Link to={'/profile'}>  View Profile </Link>
                    </h2>
                   
                  </div>

                  <div className="flex gap-2">
                    {/* <Button>Logout</Button> */}
                    <LogOut className="ml-1" />
                    <h2 className="hover:border-b-2 hover:border-gray-400 hover:pb-1 cursor-pointer" onClick={handleLogout}>
                      Logout
                    </h2>{" "}
                  </div>
                </div>

                {/* <h1 className="text-lg font-semibold">Hello</h1>
                <p className="text-sm">Welcome to your profile</p>
                <Button className="mt-2">Log out</Button> */}
              </PopoverContent>
            </Popover>
          )}

          {/* Avatar and Popover */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
