"use client";
import CoWorkForm from "@/components/admin/CoWorkForm";
import PreviewCard from "@/components/admin/PreviewCard";
import React from "react";
import { useCardContext } from "@/context/CardContext";

export default function page() {
  const { name, desc, previewImage } = useCardContext();
  return (
    <div className="p-10">
      <div className="mt-10 mb-10 text-5xl font-medium">
        Manage Co-working Space
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <div className="font-bold text-2xl mb-5">Create Working Space</div>
          <CoWorkForm />
        </div>
        <div>
          <div className="font-bold text-2xl flex justify-end mb-5">
            Preview
          </div>
          <div className="flex justify-end">
            <PreviewCard name={name} desc={desc} img={previewImage} />
          </div>
        </div>
      </div>
    </div>
  );
}
