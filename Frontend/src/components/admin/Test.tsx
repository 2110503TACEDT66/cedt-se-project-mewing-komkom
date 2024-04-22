"use client";
import updateWorkingSpace from "@/libs/updateWorkingSpace";
import { useSession } from "next-auth/react";
import React from "react";

export default function Test() {
  const session = useSession();
  const onSubmit = (e: any) => {
    e.preventDefault();
    updateWorkingSpace("6624ce411725e7ef4dbc3359", session.data!.user.token, {
      name: "cardEdit.name",
      address: "cardEdit.address",
      tel: "081530",
      openTime: "cardEdit.openTime",
      closeTime: "cardEdit.closeTime",
      remaining: 10,
      image: "cardEdit.image",
    });
  };
  return (
    <div className="mt-20">
      <button onClick={onSubmit}>click me</button>
    </div>
  );
}
