// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { USER_API_ENDPOINT } from "@/utils/data";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { RefreshCcw } from "lucide-react";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [retypePassword, setRetypePassword] = useState("");
//   const [captcha, setCaptcha] = useState("");
//   const [userCaptcha, setUserCaptcha] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const generateCaptcha = async () => {
//     try {
//       const response = await axios.get(`${USER_API_ENDPOINT}/generate-captcha`);
//       ("generate-captcha");
//       setCaptcha(response.data.captcha);
//     } catch (error) {
//       console.error("Captcha generation failed");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== retypePassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${USER_API_ENDPOINT}/forgot-password`,
//         {
//           email,
//           newPassword,
//           captcha,
//           userCaptcha,
//         }
//       );

//       if (response.status === 200) {
//         toast.success(response.data.message);
//         navigate("/login");
//       }
//     } catch (error) {
//       toast.error(error.response.data.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="flex justify-center items-center min-h-screen">
//         <form
//           className="bg-white p-8 rounded-xl shadow-md space-y-4"
//           onSubmit={handleSubmit}
//         >
//           <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>

//           <div className="my-2">
//             <Label>Email</Label>
//             <Input
//               type="email"
//               placeholder="john.doe@gmail.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             ></Input>
//           </div>

//           <div className="my-2">
//             <Label>New Password</Label>
//             <Input
//               type="password"
//               placeholder="*********"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             ></Input>
//           </div>

//           <div className="my-2">
//             <Label>Retype Password</Label>
//             <Input
//               type="password"
//               placeholder="*********"
//               value={retypePassword}
//               onChange={(e) => setRetypePassword(e.target.value)}
//             ></Input>
//           </div>

//           <div className="flex items-center space-x-2">
//             <span className="p-2 border rounded bg-gray-100">{captcha}</span>
//             <button
//               type="button"
//               onClick={generateCaptcha}
//               className="p-2 bg-blue-500 text-white rounded"
//             >
//               <RefreshCcw />
//             </button>

//             <input
//               type="text"
//               placeholder="Captcha"
//               className="p-2 border rounded w-1/4"
//               value={userCaptcha}
//               onChange={(e) => setUserCaptcha(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full p-2 bg-green-500 text-white rounded"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { USER_API_ENDPOINT } from "@/utils/data";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RefreshCcw } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = async () => {
    try {
      const response = await axios.get(`${USER_API_ENDPOINT}/generate-captcha`);
      setCaptcha(response.data.captcha);
    } catch (error) {
      console.error("Captcha generation failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== retypePassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${USER_API_ENDPOINT}/forgot-password`,
        {
          email,
          newPassword,
          captcha,
          userCaptcha,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <form
          className="bg-white p-8 shadow-md space-y-4 border border-gray-700 rounded-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
            Forgot Password
          </h2>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="john.doe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="my-2">
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="*********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="my-2">
            <Label>Retype Password</Label>
            <Input
              type="password"
              placeholder="*********"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <span className="p-2 border rounded bg-gray-100">{captcha}</span>
              <button
                type="button"
                onClick={generateCaptcha}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <RefreshCcw />
              </button>
            </div>

            <Input
              type="text"
              placeholder="Captcha"
              className="p-2 border rounded w-40"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Reset Password
          </button>
        </form>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ForgotPassword;
