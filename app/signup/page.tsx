import Image from "next/image";
import React from "react";

const LoginPage = () => {
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
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          className="form-control"
          placeholder="Enter Your Username"
        />
        <label className="mt-3" htmlFor="Password">
          Password
        </label>
        <input
          type="text"
          id="Password"
          className="form-control"
          placeholder="Enter Your Password"
        />
        <label className="mt-3" htmlFor="ConfrimPassword">
          Confrim Password
        </label>
        <input
          type="text"
          id="ConfrimPassword"
          className="form-control"
          placeholder="Enter Your Password"
        />
        <label className="mt-3" htmlFor="user_type">
          Confrim Password
        </label>
        <select name="user_type" id="user_type" className="form-control">
          <option value="">Select User Type</option>
          <option value="">Teacher</option>
          <option value="">Student</option>
        </select>
        <div className="d-grid gap-2 my-3">
          <button className="btn btn-primary" type="button">
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
