import { JOB_API_ENDPOINT } from "@/utils/data.js";
import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setJobById } from "@/redux/jobSlice";

const useGetJobById = (jobId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.status) {
          dispatch(setJobById(res.data.job));
          // console.log("API Response: ", res.data);
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);
  return { loading, error };
};

export default useGetJobById;

//-------------------------
// useEffect(() => {
//   const fetchSingleJob = async () => {
//     try {
//       const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
//         withCredentials: true,
//       });
//       if (res.data.status) {
//         dispatch(setSingleJob(res.data.job));
//         setIsApplied(
//           res.data.job.applications.some(
//             (application) => application.applicant === user?._id
//           )
//         );
//       } else {
//         setError("Failed to fetch jobs.");
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//       setError(error.message || "An error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchSingleJob();
// }, [jobId, dispatch, user?._id]);
