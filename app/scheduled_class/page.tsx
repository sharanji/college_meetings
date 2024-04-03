"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loading from "../loading";
import axios from "axios";
import { useSession } from "next-auth/react";

const ScheduledClass = () => {
  const router = useRouter();
  const session = useSession();
  var [clasess, setClasses] = useState<any>();

  useEffect(() => {
    async function fetchClass() {
      var response = await axios.get("/api/student_meets");
      if (response.status == 200 && response.data["class"]) {
        setClasses(response.data);
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
              <a>Your Classes</a>
            </li>
          </ul>
        </div>
        <div role="tablist" className="tabs tabs-boxed">
          <a role="tab" className="tab tab-active">
            {clasess ? clasess["class"]["className"] : ""}
          </a>
        </div>
        {clasess ? (
          <table className="table">
            <tbody>
              <tr>
                <th className="">Meeting Name</th>
                <th className="text-center">Meeting Type</th>
                <th className="text-center">Meeting Date</th>
                <th className="text-center">Meeting Attendance</th>
                <th className="text-center">Status</th>
              </tr>
            </tbody>
            <tbody>
              {clasess["meetings"].map((meet: any) => {
                return (
                  <tr key={meet["id"]}>
                    <td className="">{meet["meetingName"]}</td>
                    <td className="text-center">{meet["meetingType"]}</td>
                    <td className="text-center">
                      {new Date(meet["date"]).toLocaleString()}
                    </td>
                    <td className="text-center">{meet["attendance"] ?? 0}</td>
                    <td className="text-center">
                      {meet["status"] == 0 ? (
                        <p className="p-5 bg-success rounded-lg text-center ">
                          Upcomming / Pending
                        </p>
                      ) : (
                        <></>
                      )}
                      {meet["status"] == 2 ? (
                        <button
                          className="btn btn-success"
                          onClick={async () => {
                            sessionStorage.setItem(
                              "display_name",
                              session.data?.user.userName!
                            );

                            router.push("./room.html?room=" + meet["classId"]);
                          }}
                        >
                          Join now
                        </button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default ScheduledClass;
