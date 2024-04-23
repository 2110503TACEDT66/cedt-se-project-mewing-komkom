import CoWorkForm from "@/components/admin/EditCoWorkForm";
import PreviewCard from "@/components/admin/PreviewCard";
import React, { useEffect, useState } from "react";
import { useCardContext } from "@/context/CardContext";
import { useSession } from "next-auth/react";
import { Route } from "lucide-react";
import { useRouter } from "next/navigation";
import getUserProfile from "@/libs/getUserProfile";
import getSpace from "@/libs/getSpace";
import Preview from "@/components/admin/EditPreviewCard";
import Test from "@/components/admin/Test";
export default async function page({ params }: { params: { id: string } }) {
  const space = await getSpace(params.id);

  return (
    <div className="p-10">
      <div className="mt-10 mb-10 text-5xl font-medium">
        Manage Co-working Space
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <div className="font-bold text-2xl mb-5">Edit Working Space</div>
          <CoWorkForm data={space.data} />
        </div>
        <div>
          <div className="font-bold text-2xl flex justify-end mb-12"></div>
          <div className="flex justify-center">
            {/* <PreviewCard card={card} /> */}
            <Preview data={space.data} />
          </div>
        </div>
      </div>
    </div>
  );
}
