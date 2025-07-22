import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const allAppliedJobs = useSelector((store) => store.jobs.allAppliedJobs);
  return (
    <div>
      <Table>
        <TableCaption>Recent Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Sr. No</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                You have not applied any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob, index) => (
              <TableRow key={appliedJob._id}>
                <TableCell className="w-16">{index + 1}</TableCell>
                <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500"
                        : appliedJob?.status === "accepted"
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }`}
                  >
                    {" "}
                    {appliedJob?.status}
                  </Badge>{" "}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJob;
