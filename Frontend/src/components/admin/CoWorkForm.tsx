"use client";
import React, { useState } from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { useCardContext } from "@/context/CardContext";
import { SpaceItem } from "../../../interface";

export default function CoWorkForm({data}: {data?:SpaceItem}) {
  const format = "HH:mm";
  const { handleFileChange, handleFormChange } = useCardContext();
  return (
    <div className=" bg-white rounded-2xl shadow-2xl">
      <form className="p-20 grid grid-cols-4 gap-10 ">
        <label htmlFor="image-upload">รูปภาพ:</label>
        <Input
          type="file"
          className="col-span-2 max-w-60 text-gray-400"
          id="image-upload"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
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
          value={data?.name}

        />
        <label>เวลาเปิด:</label>
        <div className="col-span-3 flex gap-3">
          <TimePicker format={format} className=" " id="inputOpen" onChange={handleFormChange} />
          <div className="text-center self-center">ถึง</div>
          <TimePicker format={format} className=" " id="inputClose" />
        </div>
        <label>รายละเอียด:</label>
        <Textarea
          className="col-span-3 "
          placeholder="co-working space's detail"
          onChange={handleFormChange}
          maxLength={180}
          id="inputDesc"
          value={data?.address}
        />
        <label>จำนวนที่นั่ง:</label>

        <Input
          type="number"
          placeholder="Max seats"
          className=" rounded-lg p-3"
          min={1}
          onChange={handleFormChange}
          id="inputNumber"
          value={data?.remaining}
        />

        <div className="col-span-2"></div>
        <div className="col-span-3"></div>
        <button className="align-middle select-none text-lg font-semibold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-12 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
          Submit
        </button>
      </form>
    </div>
  );
}
