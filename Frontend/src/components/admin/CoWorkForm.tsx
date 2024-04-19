"use client";
import React, { useState } from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { useCardContext } from "@/context/CardContext";
import createCoWorkingSpace from "@/libs/createWorkingSpace";
import { SetPreviewCard } from "../../../interface";
import { useSession } from "next-auth/react";

export default function CoWorkForm() {
  const format = "HH:mm";
  const {
    handleFormChange,
    handleOpenChange,
    handleCloseChange,
    handleFileChange,
    card,
  } = useCardContext();

  const session = useSession();
  const onSubmit = () => {
    createCoWorkingSpace(
      {
        name: card.name,
        address: card.address,
        tel: "081530",
        openTime: card.openTime,
        closeTime: card.closeTime,
        remaining: card.remaining,
        image: card.image,
      },
      session.data!.user.token
    );
  };

  return (
    <div className=" bg-white rounded-2xl shadow-2xl">
      <form className="p-20 grid grid-cols-4 gap-10 ">
        <label htmlFor="image-upload">รูปภาพ:</label>
        {/* <Input
            type="file"
            className="col-span-1 max-w-60 text-gray-400"
            id="image-upload"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          /> */}
        <Input
          type="text"
          className="col-span-2 text-xs max-w-60 text-gray-400"
          placeholder="Image Url"
          id="inputImage"
          onChange={handleFormChange}
        />
        <div className="col-span-1"></div>

        {/* <label className="cursor-pointer col-span-3">
          <input type="file" className="hidden" />
          <span className=" text-sm underline text-[#9CA3AF] hover:underline-offset-2 bg-[#E1E7EA] px-6 py-1 rounded-lg top-0">
            Upload File
          </span>
        </label> */}
        <label>ชื่อ:</label>
        <Input
          type="text"
          placeholder="co-working space's name"
          className="col-span-3 "
          onChange={handleFormChange}
          maxLength={25}
          id="inputName"
        />
        <label>เวลาเปิด:</label>
        <div className="col-span-3 flex gap-3">
          <TimePicker
            format={format}
            className=" "
            id="inputTimeOpen"
            onChange={handleOpenChange}
          />
          <div className="text-center self-center">ถึง</div>
          <TimePicker
            format={format}
            className=" "
            id="inputTimeClose"
            onChange={handleCloseChange}
          />
        </div>
        <label>รายละเอียด:</label>
        <Textarea
          className="col-span-3 "
          placeholder="co-working space's detail"
          onChange={handleFormChange}
          maxLength={120}
          id="inputDesc"
        />
        <label>จำนวนที่นั่ง:</label>

        <Input
          type="number"
          placeholder="Max seats"
          className=" rounded-lg p-3"
          min={1}
          onChange={handleFormChange}
          id="inputNumber"
          defaultValue={1}
        />

        <div className="col-span-2"></div>
        <div className="col-span-3"></div>
        <button
          onClick={onSubmit}
          className="align-middle select-none text-lg font-semibold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-12 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
