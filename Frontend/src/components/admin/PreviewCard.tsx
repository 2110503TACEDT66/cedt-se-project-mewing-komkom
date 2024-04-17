import React from "react";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { AiFillClockCircle } from "react-icons/ai";
import { Time } from "../../../interface";
import { SetPreviewCard } from "../../../interface";
export default function PreviewCard({
  card,
  time,
}: {
  card?: SetPreviewCard;
  time?: Time | null;
}) {
  const descc =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga obcaecati nemo veniam minus, omnis, nam, labore sint ab dolor quisquam ipsa possimus. Itaque reprehenderit temporibus animi minima repellendus distinctio similique.";
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-xl bg-clip-border rounded-xl w-96 p-3">
      {card?.img ? (
        <div className="relative h-48 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <img src="" alt="card-image" />
        </div>
      ) : (
        <div className="h-48 flex justify-center items-center shadow-lg bg-slate-200 bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 overflow-hidden">
          <MdOutlinePhotoLibrary size={80} color="slate" />
        </div>
      )}

      <div className="p-4">
        <div></div>
        <h5 className="block text-xl antialiased font-semibold leading-snug tracking-normal text-black mt-1">
          {card?.name ? card?.name : "ชื่อ"}
        </h5>
        <div className="flex gap-2">
          <AiFillClockCircle className="mb-2" color="black" size={20} />
          <div>
            {time ? (
              <div> {`${card?.open} - ${card?.close}`} </div>
            ) : (
              "เวลาเปิด - เวลาปิด"
            )}
          </div>
        </div>
        <hr />
        <div className=" mt-2 text-lg font-medium text-black">รายละเอียด</div>
        <div className=" break-words text-base antialiased font-light leading-relaxed text-inherit">
          <>
            {card?.desc ? (
              card?.desc
            ) : (
              <div className="text-xl">
                . <br />. <br /> . <br />
              </div>
            )}
          </>
        </div>
        <div className="mt-2">จำนวนที่นั่ง : {card?.seat}</div>
      </div>

      <div className=" flex justify-end ">
        <button className="align-middle select-none text-base font-normal text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-1 px-7 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
          แก้ไข
        </button>
      </div>
    </div>
  );
}
