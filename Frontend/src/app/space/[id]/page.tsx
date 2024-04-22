"use client"
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { DatePicker, DatePickerProps, TimePicker } from "antd";
import getSpace from "@/libs/getSpace";
import { SpaceItem } from "../../../../interface";
import dayjs, { Dayjs } from "dayjs";
import TimeSelection from "@/components/ui/TimeSelectionProps";

interface Props {
  params: { id: string };
}

const SpaceDetail = ({ params }: Props) => {
  const format = "HH:mm";
  const [space, setSpace] = useState<SpaceItem>();
  const [date, setDate] = useState<Dayjs>();
  const [starttime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const spaceData = await getSpace(params.id);
        if (spaceData.data) {
          setSpace(spaceData.data);
          console.log();
        }
      } catch (error) {
        console.error("Error fetching space:", error);
      }
    };

    fetchSpace();
  }, [params.id]);

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(date);
  };

  const handleTimeChange = (time: Dayjs | null, timeType: string) => {
    if (timeType === "start") {
      setStartTime((date as Dayjs).hour(time?.hour()||0).minute(time?.minute()||0));
    } else if (timeType === "end") {
      setEndTime((date as Dayjs).hour(time?.hour()||0).minute(time?.minute()||0));
    }
  };

  const disabledTime = (current: Dayjs) => {
    return {
      disabledHours: () => {
        if (!starttime) return Array.from({ length: 24 }, (_, i) => i);
        let timeLength =starttime.hour();
        if(starttime.minute()==30){
          timeLength = timeLength+1;
        }
        return Array.from(
          { length: Math.max(0, timeLength) },
          (_, i) => i
        );
      },
      disabledMinutes: (selectedHour: number) => {
        if (!starttime) return Array.from({ length: 60 }, (_, i) => i);

        const startHour = starttime.hour();
        const startMinute = starttime.minute();

        if (selectedHour === startHour) {
          return Array.from(
            { length: Math.ceil((startMinute + 1) / 30) },
            (_, i) => i * 30
          );
        }

        if (selectedHour < startHour)
          return Array.from({ length: 60 }, (_, i) => i);

        return [];
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
                  {space?.openTime} - {space?.closeTime}
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
              <TimeSelection
                handleTimeChange={handleTimeChange}
                disabledTime={disabledTime}
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-black px-5 py-2 rounded-full text-white max-w-max ">
                reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;
