import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen, IdCard, CreditCard } from "lucide-react";

import { Badge } from "../ui/badge";
import AppliedJobs from "./AppliedJobs";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAllAppliedJobs();
  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt={user?.fullname}
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span className="">
              <a href={`mailto: ${user?.email}`}>{user?.email}</a>
            </span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span className="">
              <a href={`tel: ${user?.phoneNumber}`}>{user?.phoneNumber}</a>
            </span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <IdCard />
            <span className="">
              <a href={`adharcard: ${user?.adharcard}`}>{user?.adharcard}</a>
            </span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <CreditCard />
            <span className="">
              <a href={`adharcard: ${user?.pancard}`}>{user?.pancard}</a>
            </span>
          </div>
        </div>

        <div>
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1 ">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label className="text-md font-bold">Resume</label>
            <div>
              {isResume ? (
                <a
                  target="_blank"
                  href={user?.profile?.resume}
                  className="text-blue-600 hover:underline cursor-pointer"
                  download="resume.pdf"
                >
                  View Resume
                </a>
              ) : (
                <span>No Resume Found</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>
        {/* Application Table */}
        <AppliedJobs />
      </div>

      {/* Edit Profile Model */}
      <EditProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
