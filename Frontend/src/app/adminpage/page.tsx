import PreviewCard from "@/components/admin/PreviewCard";
import getSpaces from "@/libs/getSpaces";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { SpaceJson } from "../../../interface";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";

export default async function page() {
  const data: SpaceJson = await getSpaces();
  const ready = data.data;
  return (
    <div className="p-10">
      <div className="flex justify-center mt-10 mb-5 text-5xl font-bold">
        <div>
          <span className="bg-gradient-to-b from-blue-700 to-blue-400 bg-clip-text text-transparent">
            Manage Co-working Space
          </span>
        </div>
      </div>
      <div>
        <div className="flex justify-center mb-10">
          <Link
            href="/adminpage/create"
            className="align-middle select-none text-lg font-semibold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-12 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          >
            เพิ่ม
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-4 justify-items-center gap-10">
        {ready.map((i: any) => (
          <PreviewCard card={i} />
        ))}
      </div>
    </div>
  );
}
