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

  /* useEffect(() => {
    if (!date) {
      setAvailableSeat("-");
      return;
    }
    if (startTime && endTime) {
      const fetchAvailable = async () => {
        try {
          const availableseatha = await checkAvailableSeat(
            { startTime, endTime },
            params.id
          );
          if (!availableseatha) {
            throw new Error("cannot fetch");
          }
          setAvailableSeat(availableseatha.availableSeats);
        } catch (error) {
          console.error("error ja", error);
        }
      };
      fetchAvailable();
    }
  }, [startTime, endTime, params.id, isReserve]); */

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(date);
    if (date) {
      setStartTime(
        date.hour(startTime?.hour() || 0).minute(startTime?.minute() || 0)
      );
      setEndTime(
        date.hour(endTime?.hour() || 0).minute(endTime?.minute() || 0)
      );
    }
  };

  const handleTimeChange = (time: Dayjs | null, timeType: string) => {
    let timewithdate = date;
    if (date === undefined) {
      timewithdate = dayjs();
    }
    if (timewithdate) {
      if (timeType === "start") {
        setStartTime(
          timewithdate.hour(time?.hour() || 0).minute(time?.minute() || 0) ||
            timewithdate
        );
      } else if (timeType === "end") {
        setEndTime(
          timewithdate.hour(time?.hour() || 0).minute(time?.minute() || 0) ||
            timewithdate
        );
      }
    }
  };

  const disabledEndTime = (current: Dayjs) => {
    let closeHour = dayjs(space?.closeTime).hour();
    let closeMinute = dayjs(space?.closeTime).minute();
    let currentTimeHour = dayjs().hour();
    return {
      disabledHours: () => {
        if (!startTime) return Array.from({ length: 24 }, (_, i) => i);
        if (!date) return Array.from({ length: 24 }, (_, i) => i);
        let timeLength = startTime.hour();
        if (startTime.minute() == 30) {
          timeLength = timeLength + 1;
        }
        let arrayOfHours = Array.from(
          { length: Math.max(0, timeLength) },
          (_, i) => i
        );
        if (date?.date() === dayjs().date()) {
          for (let i = 0; i < currentTimeHour; i++) {
            arrayOfHours.push(i);
          }
        }
        if (closeHour) {
          for (let i = closeHour + 1; i < 24; i++) {
            arrayOfHours.push(i);
          }
        }
        return arrayOfHours;
      },
      disabledMinutes: (selectedHour: number) => {
        if (!startTime) return Array.from({ length: 60 }, (_, i) => i);
        if (!date) return Array.from({ length: 60 }, (_, i) => i);
        const startHour = startTime.hour();
        const startMinute = startTime.minute();

        let arrayOfMinute = [];
        if (selectedHour === startHour) {
          for (let i = 0; i < startMinute + 1; i++) {
            arrayOfMinute.push(i);
          }
        }

        if (selectedHour === closeHour) {
          for (let i = closeMinute + 1; i < 60; i++) {
            arrayOfMinute.push(i);
          }
        }

        if (selectedHour < startHour)
          return Array.from({ length: 60 }, (_, i) => i);

        return arrayOfMinute;
      },
    };
  };

  const disabledStartTime = (current: Dayjs) => {
    let openHour = dayjs(space?.openTime).hour();
    let openMinute = dayjs(space?.openTime).minute();
    let closeHour = dayjs(space?.closeTime).hour();
    let closeMinute = dayjs(space?.closeTime).minute();
    return {
      disabledHours: () => {
        if (!dayjs(space?.openTime))
          return Array.from({ length: 24 }, (_, i) => i);
        if (!date) return Array.from({ length: 24 }, (_, i) => i);
        let currentTimeHour = dayjs().hour();
        let timeLength = openHour;
        let arrayOfHours = Array.from(
          { length: Math.max(0, timeLength) },
          (_, i) => i
        );
        if (date?.date() === dayjs().date()) {
          for (let i = 0; i < currentTimeHour; i++) {
            arrayOfHours.push(i);
          }
        }
        for (let i = closeHour + 1; i < 24; i++) {
          arrayOfHours.push(i);
        }
        return arrayOfHours;
      },
      disabledMinutes: (selectedHour: number) => {
        if (!dayjs(space?.openTime))
          return Array.from({ length: 60 }, (_, i) => i);
        if (!date) return Array.from({ length: 60 }, (_, i) => i);
        let arrayOfMinute = [];
        let currentTimeMinute = dayjs().minute();
        let currentTimeHour = dayjs().hour();
        if (date?.date() === dayjs().date()) {
        }
        if (currentTimeHour === selectedHour) {
          for (let i = 0; i < currentTimeMinute; i++) {
            arrayOfMinute.push(i);
          }
        }
        if (selectedHour === openHour) {
          for (let i = 0; i < Math.ceil(openMinute / 30); i++) {
            arrayOfMinute.push(i * 30);
          }
        }
        if (selectedHour === closeHour) {
          for (let i = closeMinute; i < 60; i++) {
            arrayOfMinute.push(i);
          }
        }

        if (selectedHour < openHour) {
          arrayOfMinute = Array.from({ length: 60 }, (_, i) => i);
        }

        return arrayOfMinute;
      },
    };
  };

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
                <DatePicker
                  className="border-[#979797]"
                  onChange={handleDateChange}
                  value={date}
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="mr-5 text-[#736868] font-semibold text-base">
                Time
              </label>
              <div className="col-span-3 flex gap-3">
                <TimeSelection
                  handleTimeChange={handleTimeChange}
                  disabledTime={disabledStartTime}
                  typeTime="start"
                />
                <div className="text-center self-center text-[#736868] font-semibold text-base">
                  To
                </div>
                <TimeSelection
                  handleTimeChange={handleTimeChange}
                  disabledTime={disabledEndTime}
                  typeTime="end"
                />
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
