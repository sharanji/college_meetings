"use client";
import Image from "next/image";
import React, { Suspense, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type FormData = {
  userName: string;
  password: string;
  userType: number;
  classId: number;
};

const LoginPage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("");
  const [allClass, setAllclass] = useState([]);
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    password: "",
    classId: 0,
    userType: 0,
  });

  async function signup() {
    let _userType: number = userType == "student" ? 1 : 0;
    formData.userType = _userType;

    try {
      var response = await axios.post("/api/signup", formData);

      const res = await signIn("credentials", {
        email: response.data["data"]["userName"],
        password: response.data["data"]["password"],
        redirect: false,
      });
      console.log(res);

      if (res?.error) {
        throw res.error;
      }
      Swal.fire({
        title: "good!",
        text: response.data["message"],
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        router.replace("/");
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error!.toString(),
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }

  useEffect(() => {
    async function fetchClasses() {
      var response = await axios.get("/api/users/allclass");
      if (response.status == 200) {
        setAllclass(response.data["class"]);
      }
    }

    fetchClasses();
  }, []);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6">
            If your a student , select user type as student . Else choose type
            as Teacher
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <label htmlFor="userName">Username</label>
            <input
              type="email"
              id="userName"
              className="input input-bordered"
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              placeholder="Enter Your Username"
            />
            <label className="mt-3" htmlFor="Password">
              Password
            </label>
            <input
              type="text"
              id="Password"
              className="input input-bordered"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter Your Password"
            />
            <label className="mt-3" htmlFor="ConfrimPassword">
              Confrim Password
            </label>
            <input
              type="text"
              id="ConfrimPassword"
              className="input input-bordered"
              placeholder="Enter Your Password"
            />
            <label className="mt-3" htmlFor="user_type">
              Select user Type
            </label>
            <select
              name="user_type"
              id="user_type"
              className="input input-bordered"
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="">-Select User Type-</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
            {userType == "student" ? (
              <>
                <label className="mt-3" htmlFor="student_class">
                  Select your class
                </label>
                <select
                  name="student_class"
                  id="student_class"
                  className="input input-bordered"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      classId: Number.parseInt(e.target.value),
                    })
                  }
                >
                  <option value="">-Select Your Class-</option>
                  {allClass.map((_class: any) => (
                    <option value={_class["id"]} key={_class["id"]}>
                      {_class["className"]}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <></>
            )}
            <div className="d-grid gap-2 my-3">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  signup();
                }}
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
