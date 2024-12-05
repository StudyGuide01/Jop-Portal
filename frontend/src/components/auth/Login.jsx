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
import { setLoading, setUser } from "@/reduxStore/authSlice";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button"; // Assuming Button component exists in your project

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading } = useSelector((store) => store.auth);  // Corrected selector to access auth state
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);

    try {
      dispatch(setLoading(true)); // Set loading to true when API call starts
      const response = await axios.post(`${USER_API_END_POINTS}/login`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.data.success) {
        console.log(response.data.user);
        navigate('/');
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false)); // Set loading to false when API call ends
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex items-center justify-center bg-gray-100 py-10 mt-40">
          <form
            className="w-full sm:w-96 bg-white border border-gray-200 rounded-lg shadow-lg p-8 space-y-6"
            onSubmit={formSubmit}
          >
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h1>

            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm font-medium text-gray-600">
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

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="Enter Your Password"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label className="block text-sm font-medium text-gray-600">Role</Label>
                <RadioGroup className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Input type="radio" id="student" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="text-blue-500" />
                    <Label htmlFor="student" className="text-sm">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="radio" id="recruiter" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className="text-blue-500" />
                    <Label htmlFor="recruiter" className="text-sm">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Submit Button */}
            {loading ? (
              <div className="justify-center items-center ml-20">
              <Button disabled >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Login
              </button>
            )}

            {/* Link to Signup page */}
            <div className="text-center text-sm text-gray-600">
              <span>Don't have an account? </span>
              <Link to="/signup" className="text-blue-600 hover:text-blue-700">
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
