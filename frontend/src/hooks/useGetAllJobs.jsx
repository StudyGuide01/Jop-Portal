import { setAllJobs } from '@/reduxStore/jobSlice';
import { JOB_API_END_POINTS } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Create an internal async function
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINTS}/getAllJob`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setAllJobs(response.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs(); // Call the async function

    }, [dispatch]); // Ensure that `dispatch` is included in the dependency array

    return null; // No need to return JSX here
};

export default useGetAllJobs;
