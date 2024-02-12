"use client";

import React, { useEffect, useState } from "react";
import TeacherAnalytics from "./components/analytics";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [loginDetails, setLoginDetails] = useState<any>(null);

  function handleAuth() {
    if (loginDetails) {
      localStorage.removeItem("loginDetails");
      setLoginDetails(undefined);
    } else {
      router.push("/login");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("loginDetails")) {
      setLoginDetails(JSON.parse(localStorage.getItem("loginDetails")!));
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-dark bg-black mb-5 text-white">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button className="btn btn-primary" onClick={() => handleAuth()}>
            {!loginDetails ? "Login" : "Logout"}
          </button>
        </div>
      </nav>
      <div className="container text-center">
        <p className="h1">Hi {loginDetails ? loginDetails.userName : "User"}</p>
        <div className="h3">
          Welcome to Webrtc based Video conferancing web Application
        </div>
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-3">
            {loginDetails ? TeacherAnalytics() : "Login to see your dashboard"}
          </div>
          {loginDetails ? (
            <div className="col-3">
              <button
                className="btn btn-primary"
                onClick={() => {
                  router.push("/lobby.html");
                }}
              >
                Start class
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
