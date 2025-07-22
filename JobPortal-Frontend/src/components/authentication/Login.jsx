import React, { useState, useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventListener = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // const changeFileHandler = (e) => {
  //   setInput({ ...input, file: e.target.files?.[0] });
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(input);

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
            Login
          </h1>
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

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  id="r1"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventListener}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  id="r2"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventListener}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2" className="cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          <p className="text-gray-500 text-sm my-2 text-center">
            Forgot your password?{" "}
            <Link
              to={"/forgot-password"}
              className="text-blue-600 hover:underline"
            >
              Reset it here
            </Link>
          </p>

          {loading ? (
            <div className="flex items-center justify-center my-10">
              <div className="spinner-border text-blue-600" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <Button
              type="submit"
              className="block w-3/4  my-3  text-white bg-blue-600 hover:bg-blue-800/90 rounded-md flex items-center justify-center max-w-7xl mx-auto"
            >
              Login
            </Button>
          )}

          <div>
            {/* Do not have an account then register */}
            <p className="text-gray-500 text-sm my-2 text-center">
              Create New Account{" "}
              <Link to={"/register"}>
                <Button className="block w-3/4  my-3  text-white bg-green-600 hover:bg-green-800/90 rounded-md flex items-center justify-center max-w-7xl mx-auto">
                  Register
                </Button>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
