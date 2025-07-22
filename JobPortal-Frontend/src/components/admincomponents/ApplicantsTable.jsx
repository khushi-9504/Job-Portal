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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    // console.log("Updating status for ID:", id, "with status:", status);

    // console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // const downloadResume = async (resumeUrl) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       `/api/application/download?url=${resumeUrl}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         responseType: "blob", // Important for file downloads
  //       }
  //     );

  //     // Create a blob from the response data
  //     const blob = new Blob([response.data], { type: "application/pdf" });
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.setAttribute("download", "resume.pdf"); // Filename with extension
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Error downloading resume:", error.response);
  //   }
  // };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Sr. No</TableHead>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item, index) => (
              <tr key={item._id}>
                <TableCell className="w-16">{index + 1}</TableCell>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                {/* <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                      {/* {item?.applicant?.profile?.resume} */}
                {/* </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell> */}

                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <>
                      <a
                        className="text-blue-600 cursor-pointer mr-2"
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                      |
                      <a
                        className="text-blue-600 cursor-pointer ml-2"
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        // onClick={() =>
                        //   downloadResume(
                        //     item?.applicant?.profile?.resume,
                        //     "resume.pdf"
                        //   )
                        // }
                      >
                        Download
                      </a>
                    </>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => {
                        const radioId = `status-${item._id}-${status}`;
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="shortlistingStatus"
                              value={status}
                              id={radioId}
                            />
                            <label
                              htmlFor={radioId}
                              className="ml-2 cursor-pointer"
                            >
                              {status}
                            </label>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
