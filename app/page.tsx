"use client";

import React, { useEffect, useState, useContext, useRef } from "react";
import TeacherAnalytics from "./components/analytics";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "./components/navbar";
import { useSession } from "next-auth/react";
import StudentHome from "./components/student/home";
import TeacherHome from "./components/teacher/home";
import { signIn, signOut } from "next-auth/react";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-800">
      <Navbar />
      <div className="container ">
        <div className="mx-5 text-sm breadcrumbs">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li></li>
          </ul>
        </div>
        {session.status == "authenticated" ? (
          <>
            {session.data?.user.userType == 1 ? (
              <StudentHome />
            ) : (
              <TeacherHome />
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 gap-4 justify-items-center">
            <div className="card card-side bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Your not Authenticated.</h2>
                <p>Click button below to signIn or Signup</p>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary" onClick={() => signIn()}>
                    SignIn
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => router.push("/signup")}
                  >
                    SingUp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <div className="text-center">
          <p className=" text-pink-600">For Immediate class Join Now</p>
          <button
            onClick={() => router.push("/lobby.html")}
            className="btn btn-primary"
          >
            Join Now
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
