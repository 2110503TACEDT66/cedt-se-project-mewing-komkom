"use client";
import ModalupdateHandle from "@/components/ModalupdateHadle";
import getSpace from "@/libs/getSpace";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import getReservation from "@/libs/getsingleReservation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SpaceItem } from "../../../../../interface";
import { useSession } from "next-auth/react";
import { Router } from "next/router";
import { redirect, usePathname } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, DatePickerProps } from "antd";
import TimeSelection from "@/components/ui/TimeSelectionProps";
import Swal from "sweetalert2";
import checkAvailableSeat from "@/libs/checkAvailableSeat";
interface Props {
  params: { id: string };
}

export default function ReservationDetail({ params }: Props) {
  const session = useSession();
  if (!session || !session.data?.user.token) {
    redirect("/login");
  }

  const [space, setSpace] = useState<SpaceItem>();
  const [date, setDate] = useState<Dayjs>();
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [isReserve, setIsReserve] = useState(false);
  const [availableSeat, setAvailableSeat] = useState<number | string>(0);
  const handleOnSubmit = () => {};

  useEffect(() => {
    const fetchAvailable = async () => {
      const availableSeat = await checkAvailableSeat(
        { startTime: dayjs(), endTime: dayjs().add(2, "hour") },
        space?._id || ""
      );
      if (!availableSeat) return;
      setAvailableSeat(availableSeat.availableSeats);
    };
    fetchAvailable();
  }, []);

  useEffect(() => {
    const fetchReserve = async () => {
      try {
        const fetchReserve = await getReservation(
          params.id,
          session.data.user.token
        );
        try {
          const spacedata = await getSpace(fetchReserve.data.workingSpace._id);
          setSpace(spacedata.data);
        } catch (error) {
          console.error("Error fetching space:", error);
        }
      } catch (error) {
        console.error("Error fetching reserve:", error);
      }
    };
    fetchReserve();
  }, [params.id]);

  return (
    <div className="flex justify-center my-20">
      <div className="bg-white relative flex justify-center items-center p-4 pl-10 rounded-3xl w-[1184px] h-[613px]">
        <div
          className="bg-gray-200 w-[512px] h-[478px] rounded-2xl"
          style={{
            backgroundImage: `url(${space?.image})`,
            backgroundSize: "cover",
          }}
        />

        <div>
          <div className="flex flex-col justify-between p-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold">{space?.name}</h1>
                <span className="bg-green-400 text-white rounded-lg px-3 max-w-max">
                  เปิดอยู่
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock />
                <p>
                  {dayjs(space?.openTime).format("HH:mm")} -{" "}
                  {dayjs(space?.closeTime).format("HH:mm")}
                </p>
              </div>
              <hr />
              <p>{space?.address}</p>
              <p>{space?.tel}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between p-10 gap-y-5">
            <div className="flex items-center gap-5 mb-3">
              <div className="text-[#736868] font-semibold text-base">Date</div>
              <div>
                {/*  <DatePicker
                  className="border-[#979797]"
                  onChange={handleDateChange}
                  value={date}
                /> */}
              </div>
            </div>
            <div className="flex items-center">
              <label className="mr-5 text-[#736868] font-semibold text-base">
                Time
              </label>
              <div className="col-span-3 flex gap-3">
                {/* <TimeSelection
                  handleTimeChange={handleTimeChange}
                  disabledTime={disabledStartTime}
                  typeTime="start"
                /> */}
                <div className="text-center self-center text-[#736868] font-semibold text-base">
                  To
                </div>
                {/* <TimeSelection
                  handleTimeChange={handleTimeChange}
                  disabledTime={disabledEndTime}
                  typeTime="end"
                /> */}
              </div>
            </div>
            <div>Available seat : {availableSeat}</div>
            <div className="flex justify-end">
              <button
                onClick={handleOnSubmit}
                className="bg-black px-5 py-2 rounded-full text-white max-w-max "
              >
                reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
