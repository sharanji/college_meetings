"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import { useRouter, useSearchParams } from "next/navigation";
import Classdata from "./components/classdata";
import { Suspense } from "react";
import Loading from "../loading";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  var classId = searchParams!.get("class_id") ?? "0";
  const [classList, setClasslist] = useState([]);

  useEffect(() => {
    async function fetchClass() {
      var response = await axios.get("/api/class");
      if (response.status == 200 && response.data["class"]) {
        setClasslist(response.data["class"]);
      }
    }
    fetchClass();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen p-5">
        <div className="mx-5 text-sm breadcrumbs">
          <ul>
            <li>
              <a onClick={() => router.push("/")}>Home</a>
            </li>
            <li>
              <a>Manage Classes</a>
            </li>
          </ul>
        </div>
        <div className="flex justify-center my-3">
          <div className="card-actions">
            <button
              className="btn bg-slate-950 hover:bg-cyan-950-600 mx-1"
              onClick={() => router.push("create_meets")}
            >
              Create Meetings
            </button>
            <button
              className="btn bg-slate-950 hover:bg-cyan-950-600 mx-1"
              onClick={() => router.push("/manage_class/newclass")}
            >
              Add new class
            </button>
          </div>
        </div>
        <div role="tablist" className="tabs tabs-boxed">
          {classList.map((c: any) => {
            return (
              <a
                key={c.id}
                role="tab"
                className={`tab ${classId == c.id ? "tab-active" : ""}`}
                onClick={() => router.push("?class_id=" + c.id)}
              >
                {c.className}
              </a>
            );
          })}
        </div>

        {classList.length > 0 && classId != "0" ? (
          <Classdata classId={classId}></Classdata>
        ) : (
          <div>No Classes found</div>
        )}
      </div>
    </>
  );
};

export default Page;
