import ModalupdateHandle from "@/components/ModalupdateHadle";
import getSpace from "@/libs/getSpace";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import getReservation from "@/libs/getsingleReservation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Props {
  params: { id: string };
}

export default async function ReservationDetail({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const reservation = await getReservation(params.id, session.user.token);
  const space = await getSpace(reservation.data.workingSpace._id);

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
                {space.data.openTime} - {space.data.closeTime}
              </p>
            </div>
            <hr />
            <p>{space.data.address}</p>
            <p>{space.data.tel}</p>
          </div>

          <div className="flex gap-2 items-center mt-5">
            <ModalupdateHandle
              space={space.data}
              context="แก้ไข"
              id={params.id}
            />
            <p>ที่ว่าง: {space.data.maxSeat}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
