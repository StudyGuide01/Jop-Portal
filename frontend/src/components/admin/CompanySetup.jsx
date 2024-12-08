import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINTS } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  useGetCompanyById(params.id)
  // Correctly initialize the state using useState
  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const changeEventHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input changes
  const changeFileHandler = (e) => {
    setInput((prevState) => ({
      ...prevState,
      file: e.target.files?.[0] || null,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("companyName", input.companyName);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
        setLoading(true);
      const response = await axios.patch(
        `${COMPANY_API_END_POINTS}/updateCompany/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/admin/companies");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
        setLoading(false)
    }
  };

  useEffect(()=>{
setInput({
    companyName: singleCompany.companyName || "",
    description:singleCompany.description || "",
    website:singleCompany.website || "",
    location:singleCompany.location || "",
    file:null
})
  },[singleCompany]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between mb-8">
          <Button onClick={() => navigate("/admin/companies")} variant="outline"  className="flex items-center gap-2 text-gray-600 font-medium">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
            {/* <Button
            onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 font-medium"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button> */}
            <h1 className="font-semibold text-xl text-gray-800">
              Company Setup
            </h1>
          </div>

          {/* Company Name Input */}
          <div className="mb-6">
            <Label>Company Name</Label>
            <Input
              type="text"
              name="companyName"
              value={input.companyName}
              onChange={changeEventHandler}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Website Input */}
          <div className="mb-6">
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Location Input */}
          <div className="mb-6">
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* File Input */}
          <div className="mb-6">
            <Label>Upload Logo</Label>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="w-full mt-2 text-gray-700 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-4 mt-8">
            <Button
              variant="outline"
              type="button"
              className="px-6 py-3 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </Button>

            {
                loading ?    <Button
             
                className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <Loader2 className="w-4 h-4 animate-spin" /> Please wait!
              </Button> :  <Button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Submit
            </Button>
            }
            {/* <Button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Submit
            </Button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
