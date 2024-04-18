"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ModalBan from "./ModalBan";

export default function ModalBanHandle({ data }: { data: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2 items-center mt-5">
      {data.banUntil ? (
        <button
          className="bg-blue-500 px-5 py-2 rounded-full text-white max-w-max "
          onClick={() => {
            setOpen(true);
          }}
        >
          Unban
        </button>
      ) : (
        <button
          className="bg-rose-500 px-5 py-2 rounded-full text-white max-w-max "
          onClick={() => {
            setOpen(true);
          }}
        >
          Ban
        </button>
      )}

      <ModalBan isOpen={open} data={data} handleClose={() => setOpen(false)} />
    </div>
  );
}