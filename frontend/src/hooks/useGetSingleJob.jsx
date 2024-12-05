import { setSingleJob } from '@/reduxStore/jobSlice';
import { JOB_API_END_POINTS } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetSingleJob = (jobId) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchSingleJob=async()=>{
            try {
                const response = await axios.get(`${JOB_API_END_POINTS}/getJobById/${jobId}`,{withCredentials:true});
if(response.data.success){
dispatch(setSingleJob(response.data.job))
}
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob();
    },[]);
  return (
    <div>
      
    </div>
  )
}

export default useGetSingleJob
