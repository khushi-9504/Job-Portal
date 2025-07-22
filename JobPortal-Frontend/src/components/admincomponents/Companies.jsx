import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import usegetAllCompanies from "@/hooks/usegetAllCompanies";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

import { useDispatch } from "react-redux";
import { searchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  const navigate = useNavigate();
  usegetAllCompanies();
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by Name"
            onChange={(e) => setInput(e.target.value)}
          ></Input>
          <Button onClick={() => navigate("/admin/companies/create")}>
            Add Company
          </Button>
        </div>

        <div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
