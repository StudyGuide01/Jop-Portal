import { setSingleCompany } from '@/reduxStore/companySlice';
import { setAllJobs } from '@/reduxStore/jobSlice';
import { COMPANY_API_END_POINTS, JOB_API_END_POINTS } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Create an internal async function
        const fetchSingleCompany = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINTS}/getCompanyById/${companyId}`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setSingleCompany(response.data.company));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchSingleCompany(); // Call the async function

    }, [companyId,dispatch]); // Ensure that `dispatch` is included in the dependency array

    return null; // No need to return JSX here
};

export default useGetCompanyById;
