"use client";
import React from "react";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { AiFillClockCircle } from "react-icons/ai";
import { SpaceItem, Time } from "../../../interface";
import { SetPreviewCard } from "../../../interface";
import Link from "next/link";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { usePathname } from "next/navigation";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Set the default timezone to your country's timezone
dayjs.tz.setDefault("Asia/Bangkok");
export default function PreviewCard({ card }: { card?: SpaceItem }) {
  const pathname = usePathname();
  const descc =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga obcaecati nemo veniam minus, omnis, nam, labore sint ab dolor quisquam ipsa possimus. Itaque reprehenderit temporibus animi minima repellendus distinctio similique.";
  return (
    <div className="h-[520px] relative flex flex-col text-gray-700 bg-white shadow-xl bg-clip-border justify-between rounded-2xl w-96 p-3">
      <div>
        {card?.image ? (
          <div className="relative h-[180px] mx-4 mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
            <img src={card?.image} alt="card-image" />
          </div>
        ) : (
          <div className="h-48 flex justify-center items-center shadow-lg bg-slate-200 bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 overflow-hidden">
            <MdOutlinePhotoLibrary size={80} color="slate" />
          </div>
        )}

        <div className="p-4">
          <h5 className="block text-xl antialiased font-semibold leading-snug tracking-normal text-black mt-1">
            {card?.name ? card?.name : "ชื่อ"}
          </h5>
          <div className="flex gap-2">
            <AiFillClockCircle className="mb-2" color="black" size={20} />
            <div>
              {card?.openTime || card?.closeTime ? (
                <div>
                  {" "}
                  {`${dayjs(card?.openTime).format("HH:mm a")} - ${dayjs(card?.closeTime).format("HH:mm a")}`}{" "}
                </div>
              ) : (
                "เวลาเปิด - เวลาปิด"
              )}
            </div>
          </div>
          <hr />
          <div className=" mt-2 text-lg font-medium text-black">รายละเอียด</div>
          <div className="break-words h-24 overflow-hidden text-base antialiased font-light leading-relaxed text-inherit">
            {card?.address ? (
              card?.address
            ) : (
              <div className="text-xl">
                . <br />. <br /> . <br />
              </div>
            )}
          </div>
        </div>
        <div className="px-4">
          <div className="mt-2 flex gap-3 ">
            <div>จำนวนที่นั่ง :</div>
            <div>{card?.maxSeat}</div>
          </div>
        </div>
        <div className="flex justify-end">
          {pathname === "/adminpage" ? (
            <Link href={`/adminpage/edit/${card?._id}`}>
              <button className="align-middle select-none text-base font-normal text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-1 px-7 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                แก้ไข
              </button>
            </Link>
          ) : (
            <button
              disabled
              className="align-middle select-none text-base font-normal text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-1 px-7 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            >
              แก้ไข
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
