import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/components_lite/Home";
import PrivacyPolicy from "./components/components_lite/PrivacyPolicy";
import TermsOfService from "./components/components_lite/TermsOfService";
import Jobs from "./components/components_lite/Jobs";
import Browse from "./components/components_lite/Browse";
import Profile from "./components/components_lite/Profile";
import Description from "./components/components_lite/Description";
import Companies from "./components/admincomponents/Companies";
import CompanyCreate from "./components/admincomponents/CompanyCreate";
import CompanySetup from "./components/admincomponents/CompanySetup";
import AdminJobs from "./components/admincomponents/AdminJobs";
import PostJob from "./components/admincomponents/PostJob";
import JobUpdate from "./components/admincomponents/JobUpdate";
import Applicants from "./components/admincomponents/Applicants";
import ProtectedRoute from "./components/admincomponents/ProtectedRoute";
import AdminProfile from "./components/admincomponents/AdminProfile";
import ForgotPassword from "./components/components_lite/ForgotPassword";
const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/description/:id", element: <Description /> },
  { path: "/terms-of-service", element: <TermsOfService /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/home", element: <Home /> },
  { path: "/browse", element: <Browse /> },
  { path: "/profile", element: <Profile /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/admin/profile", element: <AdminProfile /> },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/job/update/:id",
    element: (
      <ProtectedRoute>
        <JobUpdate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
