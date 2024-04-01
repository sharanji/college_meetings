"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const [className, setClassname] = useState("");
  const session = useSession();
  const router = useRouter();
  async function createClass() {
    var response = await axios.post("/api/class/new", {
      className: className,
      userId: session.data?.user.userId,
    });
    setClassname("");
    Swal.fire({
      title: "Class Created",
      text: "A New Class Has been Added" + response.data["messgae"],
      icon: "success",
    });
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Create a New Class</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button onClick={() => router.back()} className="btn btn-error">
              Go Back
            </button>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={() => createClass()}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Class Name</span>
                </label>
                <input
                  type="name"
                  placeholder="Class name"
                  value={className}
                  className="input input-bordered"
                  required
                  onChange={(e) => setClassname(e.target.value)}
                />
              </div>

              <div className="form-control mt-6">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    createClass();
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
    </div>
  );
};

export default Page;
