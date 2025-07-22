import { Popover } from "@radix-ui/react-popover";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("Logged out successfully");
      } else {
        toast.error("Failed to log out");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <Link to={"/home"}>
            <h1 className="text-2xl font-bold">
              <span className="text-[#6B3AC2]">Job </span>
              <span className="text-[#FA4F09]">Hunt</span>
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role == "Recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/home"}>Home</Link>
                </li>

                <li>
                  <Link to={"/browse"}>Browse</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                {""}
                <Button variant="outline">Login</Button>
              </Link>

              <Link to={"/register"}>
                {""}
                <Button className="bg-red-600 hover:bg-red-700">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>

                  <div>
                    <h3 className="font-medium">{user?.fullname}</h3>
                    <p className="text-sm text-muted-foreground text-justify">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "Student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2></User2>
                      <Button variant="link">
                        <Link to={"/profile"}>Profile</Link>
                      </Button>
                    </div>
                  )}

                  {user && user.role === "Recruiter" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2></User2>
                      <Button variant="link">
                        <Link to={"/admin/profile"}>Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut></LogOut>
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
