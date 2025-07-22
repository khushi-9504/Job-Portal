import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AdminJobsTable from "./AdminJobsTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { searchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  // useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by Name & Jobs"
            onChange={(e) => setInput(e.target.value)}
          ></Input>
          <Button onClick={() => navigate("/admin/jobs/create")}>
            Post new job
          </Button>
        </div>

        <div>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
