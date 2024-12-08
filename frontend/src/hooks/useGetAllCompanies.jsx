import { setAllCompanies} from '@/reduxStore/companySlice';
import { setAllJobs } from '@/reduxStore/jobSlice';
import { COMPANY_API_END_POINTS } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Create an internal async function
        const fetchAllCompany = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINTS}/getCompany`, { withCredentials: true });
                if (response.data.success) {
                    console.log(response.data.companies);
                    dispatch(setAllCompanies(response.data.companies));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllCompany(); // Call the async function

    }, [dispatch]); // Ensure that `dispatch` is included in the dependency array

    return null; // No need to return JSX here
};

export default useGetAllCompanies;
