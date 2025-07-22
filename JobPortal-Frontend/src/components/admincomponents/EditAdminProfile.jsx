import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const EditAdminProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    pancard: user?.pancard,
    adharcard: user?.adharcard,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.profilePhoto,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullname", input.fullname);
    formdata.append("email", input.email);
    formdata.append("phoneNumber", input.phoneNumber);
    formdata.append("pancard", input.pancard);
    formdata.append("adharcard", input.adharcard);
    formdata.append("bio", input.bio);
    formdata.append("skills", input.skills);

    if (input.profilePhoto) {
      formdata.append("profilePhoto", input.profilePhoto);
    }
    if (input.resume) {
      formdata.append("resume", input.resume);
    }

    // console.log(formdata);
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser({ ...res.data.user, skills: input.skills }));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile ");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  // const FileChangeHandler = (e) => {
  //   const file = e.target.files?.[0];
  //   setInput({ ...input, file });
  // };

  const FileChangeHandler = (e, fileType) => {
    const file = e.target.files?.[0];
    setInput({ ...input, [fileType]: file });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[500px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            {/* Form for editing profile */}

            <form onSubmit={handleFileChange}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <input
                    type="text"
                    id="name"
                    name="fullname"
                    value={input.fullname}
                    onChange={changeEventHandler}
                    className="col-span-3 border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    className="col-span-3 border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone Number
                  </Label>
                  <input
                    type="tel"
                    id="phone"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    className="col-span-3 border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pancard" className="text-right">
                    Pan Card
                  </Label>
                  <input
                    type="text"
                    id="pancard"
                    name="pancard"
                    value={input.pancard}
                    onChange={changeEventHandler}
                    className="col-span-3 border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="adharcard" className="text-right">
                    Adhar Card
                  </Label>
                  <input
                    type="number"
                    id="adharcard"
                    name="adharcard"
                    value={input.adharcard}
                    onChange={changeEventHandler}
                    className="col-span-3 border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <input
                    type="text"
                    id="bio"
                    name="bio"
                    value={input.bio}
                    onChange={changeEventHandler}
                    className="col-span-3 border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="skills" className="text-right">
                    Skills
                  </Label>
                  <input
                    type="text"
                    id="skills"
                    value={input.skills}
                    name="skills"
                    onChange={changeEventHandler}
                    className="col-span-3 border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Profile Photo
                  </Label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => FileChangeHandler(e, "profilePhoto")}
                    accept="image/*"
                    className="col-span-3 border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>

              <DialogFooter>
                {loading ? (
                  <Button className="w-full my-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full my-4">
                    Save
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditAdminProfile;
