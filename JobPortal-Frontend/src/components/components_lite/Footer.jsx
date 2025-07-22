import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-auto">
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#6A38C2", // Background color
          color: "white", // Text color
          width: "100%", // Full width
          position: "relative", // Ensure no overflow
          left: "0",
          margin: "0px",
        }}
      >
        <p>
          2025 Job Hunt. All rights reserved. Powered by
          <a
            href="https://github.com/khushi-9504"
            className="text-white hover:underline"
          >
            {" "}
            Khushali Gajera
          </a>
        </p>
        <p>
          <Link to={"/privacy-policy"} className="text-white hover:underline">
            Privacy Policy
          </Link>{" "}
          |
          <Link to={"/terms-of-service"} className="text-white hover:underline">
            {" "}
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
