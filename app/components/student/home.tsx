import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const StudentHome = () => {
  const router = useRouter();
  const session = useSession();

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
          {/* <h2 className="card-title">Shoes!</h2> */}
          <p>Your Scheduled classes</p>
          <div className="card-actions">
            <button
              onClick={() => router.push("scheduled_class")}
              className="btn btn-dark"
            >
              See All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
