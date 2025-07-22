import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen, IdCard, CreditCard } from "lucide-react";

import { Badge } from "../ui/badge";
import EditAdminProfile from "./EditAdminProfile";
import { useSelector } from "react-redux";

const isResume = true;

const AdminProfile = () => {
  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
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
      </div>

      {/* Edit Profile Model */}
      <EditAdminProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default AdminProfile;
