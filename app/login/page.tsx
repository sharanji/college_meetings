"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoadingIcons from "react-loading-icons";
import axios from "axios";
import { headers } from "next/headers";

const LoginPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [passowrd, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  function tryLogin() {
    if (passowrd.length >= 8) {
      setLoading(true);
      axios
        .post("/api/login", {
          body: {
            email: userName,
            password: passowrd,
          },
        })
        .then((response) => {
          localStorage.setItem(
            "loginDetails",
            JSON.stringify({ userId: 10, userName: "Sahana" })
          );
          router.replace("/");
        });
    } else {
      alert("Invalid Credentials");
    }
    return false;
  }

  return (
    <div
      className="row d-flex justify-content-center align-items-center"
      style={{
        height: "80vh",
        width: "100%",
        color: "#00000",
        overflow: "hidden",
      }}
    >
      <div className="col-md-4 align-middle">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 text-center">
            <Image
              src="/logo.png"
              alt="Vercel Logo"
              className="dark:invert"
              width={80}
              height={80}
            />
          </div>
        </div>
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            tryLogin();
          }}
        >
          <label htmlFor="userName">Username</label>
          <input
            type="email"
            id="userName"
            className="form-control"
            required
            placeholder="Enter Your Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label className="mt-3" htmlFor="Password">
            Password
          </label>
          <input
            type="password"
            id="Password"
            className="form-control"
            placeholder="Enter Your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex justify-content-end gap-2 my-3">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              style={{ height: "40px" }}
            >
              {isLoading ? <LoadingIcons.Oval height={30} /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
