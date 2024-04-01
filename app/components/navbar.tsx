"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const session = useSession();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a onClick={() => router.push("/")} className="btn btn-ghost text-xl">
          Adhiyamaan
        </a>
      </div>
      <div className="flex-none">
        {session.status != "authenticated" ? (
          <button className="btn btn-primary mx-2" onClick={() => signIn()}>
            Sign In
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => signOut()}>
            Sign out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
