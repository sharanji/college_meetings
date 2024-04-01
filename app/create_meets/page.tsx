"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Page = () => {
  const session = useSession();
  const router = useRouter();
  var date = new Date();
  const formattedDateTime = date.toISOString().slice(0, 19).replace("T", " ");

  const [meetName, setMeetname] = useState("");
  const [classId, setclassId] = useState(0);
  const [classRooms, setclassRooms] = useState<any>([]);
  const [dateTime, setdateTime] = useState(formattedDateTime);
  async function submitForm() {
    var res = await axios.post("/api/meetings", {
      classId: classId,
      meetingName: meetName,
      date: dateTime,
    });

    if (res.status == 200) {
      Swal.fire({
        title: "Meeting Created",
        text: res.data["messgae"],
        icon: "success",
      }).then(() => {
        router.replace("/");
      });
    }
  }

  useEffect(() => {
    async function getClassrooms() {
      var res = await axios.get("/api/class");

      if (res.status == 200) {
        setclassRooms(res.data["class"]);
      }
    }

    getClassrooms();
  }, []);

  return (
    <>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Create a class now</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Class Name</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setMeetname(e.target.value)}
                  placeholder="Enter Class Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Invite Class</span>
                </label>
                <select
                  onChange={(e) => setclassId(Number.parseInt(e.target.value))}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value="" disabled selected>
                    - Select an Class Room -
                  </option>

                  {classRooms.map((c: any) => {
                    return (
                      <option key={c.id} value={c.id}>
                        {c.className}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="datetime-local"
                  placeholder="Select the class date"
                  className="input input-bordered"
                  required
                  onChange={(e) =>
                    setdateTime(
                      new Date(e.target.value)
                        .toISOString()
                        .slice(0, 19)
                        .replace("T", " ")
                    )
                  }
                  value={formattedDateTime}
                  min={formattedDateTime}
                  max="2024-06-14T00:00"
                />
              </div>

              <div className="form-control mt-6">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    submitForm();
                  }}
                  className="btn btn-primary"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
