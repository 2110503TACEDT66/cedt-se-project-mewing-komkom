"use client";
import CoWorkForm from "@/components/admin/CoWorkForm";
import PreviewCard from "@/components/admin/PreviewCard";
import React from "react";
import { useCardContext } from "@/context/CardContext";
import getSpace from "@/libs/getSpace";
import { SetPreviewCard } from "../../../../../interface";

interface Props {
  params: { id: string };
}
export default async function page({params}: Props) {

  const { name, desc, previewImage, num, card } = useCardContext();
  const space = await getSpace(params.id);

  const data : SetPreviewCard = {
    img: space.data.image,
    name: space.data.name,
    open: space.data.openTime,
    close: space.data.closeTime,
    desc: space.data.description,
    seat: space.data.seat,
  }
  return (
    <div className="p-10">
      <div className="mt-10 mb-10 text-5xl font-medium">
        Manage Co-working Space
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <div className="font-bold text-2xl mb-5">Edit Working Space</div>
          <CoWorkForm data={space.data}/>
        </div>
        <div>
          <div className="font-bold text-2xl flex justify-end mb-5">
            Preview
          </div>
          <div className="flex justify-end">
            <PreviewCard card={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
