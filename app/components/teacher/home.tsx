import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const TeacherHome = () => {
  const router = useRouter();

  return (
    <div className="grid grid-rows-1 grid-flow-col gap-4 p-5 ">
      <div className="card col-span-1 bg-slate-700 hover:bg-slate-600">
        <div className="text-center">
          <figure className="px-10 pt-10">
            <Image
              src={"/working.png"}
              alt="logo"
              height={100}
              width={100}
            ></Image>
          </figure>
        </div>
        <div className="card-body items-center text-center">
          <p>Create a class or scheducle</p>
          <div className="card-actions">
            <button
              className="btn btn-dark"
              onClick={() => router.push("manage_class/newclass")}
            >
              Create Now
            </button>
          </div>
        </div>
      </div>
      <div className="card col-span-1 bg-slate-700 hover:bg-slate-600">
        <div className="text-center">
          <figure className="px-10 pt-10">
            <Image
              src={"/working.png"}
              alt="logo"
              height={100}
              width={100}
            ></Image>
          </figure>
        </div>
        <div className="card-body items-center text-center">
          <p>Manage Class Rooms</p>
          <div className="card-actions">
            <button
              className="btn btn-dark"
              onClick={() => router.push("manage_class")}
            >
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
