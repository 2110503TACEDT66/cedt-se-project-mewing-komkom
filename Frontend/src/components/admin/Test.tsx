// "use client";
// import { useCardContext } from "@/context/CardContext";
// import updateWorkingSpace from "@/libs/updateWorkingSpace";
// import { useSession } from "next-auth/react";
// import React, { useContext } from "react";
// import { SpaceItem } from "../../../interface";

// export default function Test({ card }: { card?: SpaceItem }) {
//   const session = useSession();
//   const onSubmit = (e: any) => {
//     e.preventDefault();
//     updateWorkingSpace("6624ce411725e7ef4dbc3359", session.data!.user.token, {
//       name: "cardEdit.name",
//       address: "cardEdit.address",
//       tel: "081530",
//       openTime: "cardEdit.openTime",
//       closeTime: "cardEdit.closeTime",
//       maxSeat: 10,
//       image: "cardEdit.image",
//     });
//   };
//   if(!data) return null
//   return (
//     <div className="relative flex flex-col text-gray-700 bg-white shadow-xl bg-clip-border rounded-xl w-96 p-3">
//       {card?.image ? (
//         <div className="relative h-[180px] mx-4 mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
//           <img src={card?.image} alt="card-image" />
//         </div>
//       ) : data?.image ? (
//         <div className="relative h-[180px] mx-4 mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
//           <img src={data?.image} alt="card-image" />
//         </div>
//       ) : (
//         <div className="h-48 flex justify-center items-center shadow-lg bg-slate-200 bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 overflow-hidden">
//           <MdOutlinePhotoLibrary size={80} color="slate" />
//         </div>
//       )}

//       <div className="p-4">
//         <div></div>
//         <h5 className="block text-xl antialiased font-semibold leading-snug tracking-normal text-black mt-1">
//           {card?.name ? card?.name : data?.name}
//         </h5>
//         <div className="flex gap-2">
//           <AiFillClockCircle className="mb-2" color="black" size={20} />
//           <div>
//             {card?.openTime || card?.closeTime ? (
//               <div> {`${card?.openTime} - ${card?.closeTime}`} </div>
//             ) : (
//               <div>
//                 {dayjs(data?.openTime).tz('Asia/Bangkok').format('HH:mm')} - {dayjs(data?.closeTime).tz('Asia/Bangkok').format('HH:mm')}
//               </div>
//             )}
//           </div>
//         </div>
//         <hr />
//         <div className=" mt-2 text-lg font-medium text-black">รายละเอียด</div>
//         <div className=" break-words text-base antialiased font-light leading-relaxed text-inherit">
//           {card?.address ? card?.address : data?.address}
//         </div>
//         <div className="mt-2 flex gap-3 ">
//           <div>จำนวนที่นั่ง :</div>
//           <div>{card?.maxSeat ? card?.maxSeat : data?.maxSeat}</div>
//         </div>
//       </div>

//       <div className=" flex justify-end ">
//         <button className="align-middle select-none text-base font-normal text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-1 px-7 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
//           แก้ไข
//         </button>
//       </div>
//     </div>
//   );
// }
