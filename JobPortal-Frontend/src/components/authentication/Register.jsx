import React, { useState, useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { ArrowLeft, Loader2 } from "lucide-react";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    pancard: "",
    adharcard: "",
    role: "",
    phoneNumber: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventListener = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("pancard", input.pancard);
    formData.append("adharcard", input.adharcard);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("profilePhoto", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-700 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center text-blue-700">
            Register
          </h1>
          <div className="my-2">
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="John Doe"
              value={input.fullname}
              name="fullname"
              onChange={changeEventListener}
            ></Input>
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="john.doe@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventListener}
            ></Input>
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="***********"
              value={input.password}
              name="password"
              onChange={changeEventListener}
            ></Input>
          </div>
          <div>
            <Label>PAN Card Number</Label>
            <Input
              type="text"
              value={input.pancard}
              name="pancard"
              onChange={changeEventListener}
              placeholder="ABCDEF1234G"
            ></Input>
          </div>
          <div>
            <Label>Adhar Card Number</Label>
            <Input
              type="text"
              value={input.adharcard}
              name="adharcard"
              onChange={changeEventListener}
              placeholder="123456789012"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Mobile Number</Label>
            <Input
              type="tell"
              placeholder="+1234567890"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventListener}
            ></Input>
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventListener}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventListener}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-2">
            <Label>Profile Photo</Label>
            <Input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={changeFileHandler}
            ></Input>
          </div>

          {loading ? (
            <Button className="w-full my-4 text-white bg-blue-600 hover:bg-blue-800/90 rounded-md">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 text-white bg-blue-600 hover:bg-blue-800/90 rounded-md"
            >
              Register
            </Button>
          )}

          {/* Already account then login */}
          <p className="text-gray-500 text-sm my-2">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-700 font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
