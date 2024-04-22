import Modal from "@/components/Modal";
import ModalHandle from "@/components/ModalHandle";
import getSpace from "@/libs/getSpace";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { SpaceItem } from "../../../../interface";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Set the default timezone to your country's timezone
dayjs.tz.setDefault('Asia/Bangkok');

interface Props {
  params: { id: string };
}

export default async function SpaceDetail({ params }: Props) {
  const space = await getSpace(params.id);
  

  return (
    <div className="flex justify-center my-20   ">
      <div className="bg-white p-4 rounded-3xl">
        <div
          className="bg-gray-200 w-[1000px] h-[600px] rounded-2xl"
          style={{
            backgroundImage: `url(${space.data.image})`,
            backgroundSize: "cover",
          }}
        />
        <div className="flex flex-col justify-between p-10 ">
          <div className="space-y-4 ">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">{space.data.name}</h1>
              <span className="bg-green-400 text-white rounded-lg px-3 max-w-max">
                เปิดอยู่
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaClock />
              <p>
                {dayjs(space.data.openTime).format('HH:mm')} - {dayjs(space.data.closeTime).format('HH:mm')}
              </p>
            </div>
            <hr />
            <p>{space.data.address}</p>
            <p>{space.data.tel}</p>
          </div>

            <ModalHandle space={space.data} context="จองเลย" />

        </div>
      </div>
    </div>
  );
}
