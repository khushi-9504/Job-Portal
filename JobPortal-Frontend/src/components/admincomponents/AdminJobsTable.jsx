import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Eye, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.jobs);

  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  useGetAllAdminJobs();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  if (!allAdminJobs) {
    return <div>Loading...</div>;
  }

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${JOB_API_ENDPOINT}/delete/${jobId}`,
        {
          withCredentials: true, // Pass authentication token with cookies
        }
      );

      if (response.data.status) {
        toast.success(response.data.message);
        setFilterJobs((prevJobs) =>
          prevJobs.filter((job) => job._id !== jobId)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Sr. No</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>No. of Position</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* {filterJobs.length === 0 ? (
            <span>No Jobs Posted</span>
          ) : ( */}
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No Jobs Posted
              </TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job, index) => (
              <TableRow key={job.id}>
                <TableCell className="w-16">{index + 1}</TableCell>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.position}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/job/update/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <hr />
                      <div
                        onClick={() => handleDeleteJob(job._id)}
                        className="flex items-center gap-2 w-fit cursor-pointer mt-1"
                      >
                        <Trash2 className="w-4"></Trash2>
                        <span>Remove</span>
                      </div>
                      <hr />
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer mt-1"
                      >
                        <Eye className="w-4"></Eye>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
