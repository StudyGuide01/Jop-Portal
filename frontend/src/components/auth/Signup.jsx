import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINTS } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/reduxStore/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth); // Corrected selector to access auth state
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  console.log(input);

  const changeEventHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    setInput((prevState) => ({
      ...prevState,
      file: e.target.files?.[0] || null,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER_API_END_POINTS}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Keep this if you're dealing with cookies or sessions
        }
      );

      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10">
        <form
          className="w-full sm:w-96 bg-white border border-gray-200 rounded-lg shadow-lg p-8 space-y-6"
          onSubmit={formSubmit}
        >
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Sign Up
          </h1>

          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-600"
              >
                Full Name
              </Label>
              <Input
                id="fullname"
                type="text"
                name="fullName"
                value={input.fullName}
                onChange={changeEventHandler}
                placeholder="Enter Your Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="Enter Your Email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="Enter Phone Number"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Create a Password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label className="block text-sm font-medium text-gray-600">
                Role
              </Label>
              <RadioGroup className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="student"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="text-blue-500"
                  />
                  <Label htmlFor="student" className="text-sm">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="recruiter"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="text-blue-500"
                  />
                  <Label htmlFor="recruiter" className="text-sm">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Profile Image Upload */}
            <div className="space-y-2">
              <Label
                htmlFor="profile"
                className="block text-sm font-medium text-gray-600"
              >
                Profile Picture
              </Label>
              <Input
                accept="image/*"
                id="profile"
                type="file"
                name="file"
                onChange={changeFileHandler}
                className="w-full cursor-pointer text-sm text-gray-600 border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <button
              disabled
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              <div className="flex">
              <Loader2 className="mr-2 h-4 w-4 animate-spin ml-40 mt-1" />
            <span>  Please wait...</span>
              </div>
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Sign Up
            </button>
          )}

          {/* Already have an account link */}
          <div className="text-center text-sm text-gray-600">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
