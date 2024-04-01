"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = ({ params }: { params: { meets: any } }) => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    sessionStorage.setItem("display_name", session.data?.user.userName!);

    setTimeout(function () {
      router.push("/room.html?room=" + params.meets[0]);
    }, 3000);
  });
  return (
    <div className="container min-h-screen">
      Redirecting you to join class as {params.meets[1]} <br /> Please Wait
    </div>
  );
};

export default Page;
