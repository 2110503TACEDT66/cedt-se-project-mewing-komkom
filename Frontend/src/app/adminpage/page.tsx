import PreviewCard from "@/components/admin/PreviewCard";
import React from "react";

export default function page() {
  const data = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div>
      <div className="flex justify-center mt-20 mb-5 text-5xl font-bold">
        <div>
          <span className="bg-gradient-to-b from-blue-700 to-blue-400 bg-clip-text text-transparent">
            Manage Co-working Space
          </span>
        </div>
      </div>
      <div>
        <div className="flex justify-center mb-5">
          <button className="align-middle select-none text-lg font-semibold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-12 rounded-full bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
            เพิ่ม
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 justify-items-center">
        {data.map((i: any) => (
          <PreviewCard key={i} />
        ))}
      </div>
    </div>
  );
}
