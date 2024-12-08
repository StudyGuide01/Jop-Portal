// File: createCompany.jsx
import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINTS } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { setSingleCompany } from '@/reduxStore/companySlice';
import { ArrowLeft } from 'lucide-react';

const CompanyCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');

    const registeredNewCompany = async () => {
        try {
            const response = await axios.post(`${COMPANY_API_END_POINTS}/registerCompany`, { companyName }, {
                headers: { "Content-Type": 'application/json' },
                withCredentials: true,
            });

            if (response.data.success) {
                dispatch(setSingleCompany(response.data.company));
                toast.success(response.data.message);
                const companyId = response?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error registering company");
        }
    };

    const handleCancel = () => {
        navigate('/admin/companies');
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <div className="my-10">
                    <h1 className="font-bold text-2xl">Your Company Name</h1>
                    <p className="text-gray-500">What would you like to give your company name? You can change this later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />

                <div className="flex items-center gap-4 my-10">
                <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                    <Button onClick={registeredNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    );
}

export default CompanyCreate;



// import React, { useState } from "react";
// import Navbar from "../shared/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { COMPANY_API_END_POINTS } from "@/utils/constant";
// import { useDispatch } from "react-redux";
// import { toast } from "sonner";
// import { setSingleCompany } from "@/reduxStore/companySlice";

// const CompanyCreate = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [companyName, setCompanyName] = useState();

//   const registeredNewCompany = async () => {
//     try {
//       const response = await axios.post(
//         `${COMPANY_API_END_POINTS}/registerCompany`,
//         { companyName },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.data.success) {
//         dispatch(setSingleCompany(response.data.company));
//         toast.success(response.data.message);
//         const companyId = response?.data?.company?._id;
//         navigate(`/admin/companies/${companyId}`);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCancel = () => {
//     // Navigate to the companies list or wherever you want
//     navigate("/admin/companies");
//   };

//   // const handleContinue = () => {
//   //     // Handle the Continue button logic, like submitting the form
//   //     console.log('Continue');
//   // };

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-4xl mx-auto">
//         <div className="my-10">
//           <h1 className="font-bold text-2xl">Your Company Name</h1>
//           <p className="text-gray-500">
//             What would you like to give your company name? You can change this
//             later.
//           </p>
//         </div>

//         <Label>Company Name</Label>
//         <Input
//           type="text"
//           className="my-2"
//           placeholder="JobHunt, Microsoft etc."
//           onChange={(e) => setCompanyName(e.target.value)}
//           required
//         />

//         <div className="flex items-center gap-4 my-10">
//           <Button variant="outline" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button onClick={registeredNewCompany}>Continue</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyCreate;
