"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useContext } from "react";
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
          router.replace("/");
        });
    } else {
      alert("Invalid Credentials");
    }
    return false;
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
