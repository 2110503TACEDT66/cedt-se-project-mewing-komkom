"use client";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { DatePicker, DatePickerProps, TimePicker } from "antd";
import getSpace from "@/libs/getSpace";
import { SpaceItem } from "../../../../interface";
import dayjs, { Dayjs } from "dayjs";
import TimeSelection from "@/components/ui/TimeSelectionProps";
import createReservation from "@/libs/createReservation";
import { useSession } from "next-auth/react";
import checkAvailableSeat from "@/libs/checkAvailableSeat";

interface Props {
  params: { id: string };
}

const SpaceDetail = ({ params }: Props) => {
  const session = useSession();
  const format = "HH:mm";
  const [space, setSpace] = useState<SpaceItem>();
  const [date, setDate] = useState<Dayjs>();
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [availableSeat, setAvailableSeat] = useState(0)

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const spaceData = await getSpace(params.id);
        if (spaceData.data) {
          setSpace(spaceData.data);
          setAvailableSeat(spaceData.data.maxSeat)
        }
      } catch (error) {
        console.error("Error fetching space:", error);
      }
    };

    fetchSpace();
  }, [params.id]);

  useEffect(() => {
    if (startTime && endTime) {
      const fetchAvailable = async () => {
        try {
          const availableseatha = await checkAvailableSeat({ startTime, endTime }, params.id);
          if (!availableseatha) {
            throw new Error("cannot fetch");
          }
          setAvailableSeat(availableseatha.availableSeats);
        } catch (error) {
          console.error("error ja", error);;
        }
      };
      fetchAvailable();
    }
  }, [startTime, endTime, params.id]);

  const handleReserve = async(e:any)=>{
    try {
      e.preventDefault();
      const data = {
        startTime:startTime,
        endTime:endTime,
        workingSpace:params.id
      }
      const reservation = await createReservation(data as any,(session as any).data?.user.token)
      if(!reservation){
        throw new Error("cannot create.!!")
      }
    } catch (error) {
      console.error("error create Reservation",error);
    }
  }

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(date);
  };

  const handleTimeChange = (time: Dayjs | null, timeType: string) => {
    let timewithdate = date;
    if (date === undefined) {
      timewithdate = dayjs();
    }
    if (timeType === "start") {
      setStartTime(
        timewithdate!.hour(time?.hour() || 0).minute(time?.minute() || 0) ||
          timewithdate
      );
    } else if (timeType === "end") {
      setEndTime(
        timewithdate!.hour(time?.hour() || 0).minute(time?.minute() || 0) ||
            timewithdate
      )
    }
  };

  const disabledEndTime = (current: Dayjs) => {
    let closeHour =dayjs(space?.closeTime).hour();
    let closeMinute = dayjs(space?.closeTime).minute();
    return {
      disabledHours: () => {
        if (!startTime) return Array.from({ length: 24 }, (_, i) => i);
        let timeLength = startTime.hour();
        if (startTime.minute() == 30) {
          timeLength = timeLength + 1;
        }
        let arrayOfHours = Array.from({ length: Math.max(0, timeLength) }, (_, i) => i)
        if(closeHour){
          for(let i = closeHour+1; i<24; i++){
            arrayOfHours.push(i);
          }
        }
        return arrayOfHours;
      },
      disabledMinutes: (selectedHour: number) => {
        if (!startTime) return Array.from({ length: 60 }, (_, i) => i);

        const startHour = startTime.hour();
        const startMinute = startTime.minute();

        if (selectedHour === startHour) {
          return Array.from(
            { length: Math.ceil((startMinute + 1) / 30) },
            (_, i) => i * 30
          );
        }

        if (selectedHour === closeHour) {
          let arrayOfHours:number[] = [];
          for(let i = closeMinute+1;i<40;i++){
            arrayOfHours.push(i);
          }
          
          
          return arrayOfHours
        }

        if (selectedHour < startHour)
          return Array.from({ length: 60 }, (_, i) => i);

        return [];
      },
    };
  };

  const disabledStartTime = (current: Dayjs) => {
    let openHour =dayjs(space?.openTime).hour();
    let openMinute = dayjs(space?.openTime).minute();
    let closeHour =dayjs(space?.closeTime).hour();
    let closeMinute = dayjs(space?.closeTime).minute();
    return {
      disabledHours: () => {
        if (!dayjs(space?.openTime)) return Array.from({ length: 24 }, (_, i) => i);
        
        let timeLength = openHour;
        let arrayOfHours = Array.from({ length: Math.max(0, timeLength) }, (_, i) => i);
        for(let i = closeHour+1 ;i<24;i++){
          arrayOfHours.push(i);
        }
        return arrayOfHours
      },
      disabledMinutes: (selectedHour: number) => {
        if (!dayjs(space?.openTime)) return Array.from({ length: 60 }, (_, i) => i);

        

        if (selectedHour === openHour) {
          return Array.from(
            { length: Math.ceil((openMinute) / 30) },
            (_, i) => i * 30
          );
        }

        if (selectedHour < openHour)
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
            <div>
              Available seat : {availableSeat}
            </div>
            <div className="flex justify-end">
              <button className="bg-black px-5 py-2 rounded-full text-white max-w-max " onClick={handleReserve}>
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