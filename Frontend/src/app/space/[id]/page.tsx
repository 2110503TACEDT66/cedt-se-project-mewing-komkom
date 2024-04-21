'use client'
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
  const [starttime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const spaceData = await getSpace(params.id);
        if (spaceData.data) {
          setSpace(spaceData.data);
        }
      } catch (error) {
        console.error("Error fetching space:", error);
      }
    };

    fetchSpace();
  }, [params.id]);

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(date);
    console.log(dateString);
  };

  const handleTimeChange = (time: Dayjs, timeType: string) => {
    let timeNumber = null;
    if (time) {
      let hour = time.hour();
      let minute = time.minute();
      let timeNum = hour * 100 + minute;
      timeNumber = timeNum;
    }

    if (timeType === "start") {
      console.log("this is start time is ", timeNumber);
      setStartTime(timeNumber);
    }else if (timeType === "end") {
      console.log("this is end time is ", timeNumber);
      setEndTime(timeNumber);
    }
  };

  const disabledTime = (current: Dayjs) => {
    return {
      disabledHours: () => {
        if (!starttime)
          return Array.from({ length: 24 }, (_, i) => i);
        let lengthH = (Math.max(0, (starttime) / 100))
        const startMinute = (starttime as any) % 100;
        if(startMinute==30){
          lengthH = Math.ceil(Math.max(0, (starttime + 30) / 100))
        }
        return Array.from(
          { length: lengthH },
          (_, i) => i
        );
      },
      disabledMinutes: (selectedHour:number) => {
        if (!starttime)
          return Array.from({ length: 60 }, (_, i) => i);

        const startHour = Math.floor((starttime as any) / 100);
        const startMinute = (starttime as any) % 100;

        if (selectedHour === startHour) {
          return Array.from(
            { length: (Math.floor(startMinute / 30))+1 },
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
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="mr-5 text-[#736868] font-semibold text-base">
                Time
              </label>
              <TimeSelection handleTimeChange={handleTimeChange} disabledTime={disabledTime} />
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
