"use client";
import React, { FormEvent, useState } from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { useCardContext } from "@/context/CardContext";
import createCoWorkingSpace from "@/libs/createWorkingSpace";
import { SetPreviewCard, SpaceItem } from "../../../interface";
import { useSession } from "next-auth/react";
import updateWorkingSpace from "@/libs/updateWorkingSpace";

interface Props {
  data?: any;
}

export default function EditCoWorkForm({ data }: Props) {
  const format = "HH:mm";
  const {
    handleFormChange,
    handleEditCloseChange,
    handleEditOpenChange,
    cardEdit,
    isValid,
  } = useCardContext();

  const session = useSession();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkingSpace(data.id, session.data!.user.token, {
      name: cardEdit.name ? cardEdit.name : data.name,
      address: cardEdit.address ? cardEdit.address : data.address,
      openTime: cardEdit.openTime ? cardEdit.openTime : data.openTime,
      closeTime: cardEdit.closeTime ? cardEdit.closeTime : data.closeTime,
      maxSeat: cardEdit.maxSeat ? cardEdit.maxSeat : data.maxSeat,
      image: cardEdit.image ? cardEdit.image : data.image,
    });
  };

  return (
    <div className=" bg-white rounded-2xl shadow-2xl">
      <form onSubmit={onSubmit} className="p-20 grid grid-cols-4 gap-10 ">
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
          id="Edit-image"
          onChange={handleFormChange}
          defaultValue={data?.image}
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
          id="Edit-name"
          defaultValue={data?.name}
        />
        <label>เวลาเปิด:</label>
        <div className="col-span-3 flex gap-3">
          <TimePicker
            format={format}
            className=" "
            id="Edit-openTime"
            onChange={handleEditOpenChange}
            defaultValue={dayjs(data?.openTime, "HH:mm")}
          />
          <div className="text-center self-center">ถึง</div>
          <TimePicker
            format={format}
            className=" "
            id="Edit-closeTime"
            onChange={handleEditCloseChange}
            defaultValue={dayjs(data?.closeTime, "HH:mm")}
          />
        </div>
        <label>รายละเอียด:</label>
        <Textarea
          className="col-span-3 "
          placeholder="co-working space's detail"
          onChange={handleFormChange}
          maxLength={120}
          id="Edit-address"
          defaultValue={data?.address}
        />
        <label>จำนวนที่นั่ง:</label>
        <div className="flex flex-col">
          <Input
            required
            type="number"
            placeholder="Max seats"
            className=" rounded-lg p-3"
            /* value={inputValue} */
            defaultValue={data?.maxSeat}
            onChange={handleFormChange}
            id="Edit-maxSeat"
            min={1}
          />
          <div className="text-xs text-red-500 flex ml-3 mt-3">
            {isValid ? (
              <div className="mt-4"></div>
            ) : (
              "You cant use the negative number"
            )}
          </div>
        </div>

        <div className="col-span-2"></div>
        <div className="col-span-3"></div>
        <Input
          type="submit"
          className="cursor-pointer flex justify-center rounded-full text-md w-36 transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        />
      </form>
    </div>
  );
}
