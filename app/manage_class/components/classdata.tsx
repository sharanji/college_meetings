import axios from "axios";
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
const Classdata = async ({ classId }: any) => {
  const session = useSession();
  const router = useRouter();
  const classSchudule = await axios.get("/api/meetings?class_id=" + classId);

  return classSchudule.data["class"].length > 0 ? (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Class Type</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {classSchudule.data["class"].map((c: any) => {
            return (
              <tr key={c["id"]}>
                <td>{c["meetingName"]}</td>
                <td>{c["meetingType"]}</td>
                <td>{c["date"]}</td>
                <td width={"30%"}>
                  {c["status"] == 0 ? (
                    <button
                      className="btn btn-success"
                      onClick={async () => {
                        sessionStorage.setItem(
                          "display_name",
                          session.data?.user.userName!
                        );
                        var response = await axios.post("/api/meetings/start", {
                          classId: c["classId"],
                          meetId: c["id"],
                          classAjenda:
                            "1. whats oops, 2. what is uses of  oops, 3. Applications of oops.",
                        });
                        router.push("./room.html?room=" + c["id"]);
                      }}
                    >
                      Join now
                    </button>
                  ) : (
                    <>
                      {c["status"] == 2 ? (
                        <>
                          <button
                            className="btn btn-warning"
                            onClick={() =>
                              router.push("./room.html?room=" + c["id"])
                            }
                          >
                            Meeting Ongoing
                          </button>
                          <button
                            className="btn btn-error mx-2"
                            onClick={async () => {
                              var response = await axios.post(
                                "/api/meetings/end",
                                {
                                  meetId: c["id"],
                                }
                              );
                              router.refresh();
                            }}
                          >
                            End Meeting
                          </button>
                        </>
                      ) : (
                        <button className="btn btn-error">Meeting Ended</button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="h3 text-center m-5">No Data Found</div>
  );
};

export default Classdata;
