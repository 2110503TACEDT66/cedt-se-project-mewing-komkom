"use client";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { DatePicker, DatePickerProps, TimePicker } from "antd";
import getSpace from "@/libs/getSpace";
import ModalHandle from "@/components/ModalHandle";
import DateReserve from "@/components/DateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useCardContext } from "@/context/CardContext";
import { SpaceItem } from "../../../../interface";
import { TimePickerProps } from "@mui/x-date-pickers";
interface Props {
  params: { id: string };
}

export default function SpaceDetail({ params }: Props) {
  const format = "HH:mm";
  const [date, setDate] = useState<Dayjs>();
  const [space, setSpace] = useState<SpaceItem>();
  const [starttime, setStartTime] = useState<Dayjs | null>(null);
  const [endtime, setEndTime] = useState<Dayjs | null>(null);



  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(date);
    console.log(dateString);
  };

  const onChangeTime = (time: Dayjs, timeType:string) => {
    if(timeType==='start'){
      console.log("this is start time");
      setStartTime(time);
    }else if(timeType ==='end'){
      console.log("this is end time");
      setEndTime(time);

    }
  };

  
  
  

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
                <DatePicker className="border-[#979797]" onChange={onChangeDate} />
              </div>
            </div>
            <div className="flex items-center">
              <label className="mr-5 text-[#736868] font-semibold text-base">
                Time
              </label>
              <div className="col-span-3 flex gap-3">
                <TimePicker
                  format={format}
                  className="w-[150px] border-[#979797]"
                  id="inputTimeOpen"
                  onChange={(time)=>onChangeTime(time, 'start')}
                  // defaultValue={dayjs(space.data?.openTime, 'HH:mm')}
                  minuteStep={60}
                />
                <div className="text-center self-center text-[#736868] font-semibold text-base">
                  To
                </div>
                <TimePicker
                  format={format}
                  className="w-[150px] border-[#979797] "
                  id="inputTimeClose"
                  onChange={(time)=>onChangeTime(time, 'end')}
                  minuteStep={60}
                  // defaultValue={dayjs(space.data?.closeTime, 'HH:mm')}
                />
              </div>
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
}
