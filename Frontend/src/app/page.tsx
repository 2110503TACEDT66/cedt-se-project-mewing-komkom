"use client";
import getSpaces from "@/libs/getSpaces";
import Banner from "../components/Banner";
import Card from "@/components/Card";
import Link from "next/link";
import { SpaceItem, SpaceJson } from "../../interface";
import ModalCreateNew from "@/components/admin/ModalCreateNew";
import ModalCreateNewHandle from "@/components/admin/ModalCreateNewHandle";
import checkAvailableSeat from "@/libs/checkAvailableSeat";
import dayjs from "dayjs";
import UserQuota from "@/libs/UserQuota";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [spaces, setSpaces] = useState<SpaceJson>();
  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const res = await getSpaces();
        setSpaces(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpace();
  }, []);
  return (
    <main>
      <Banner />
      <div className="-mt-96 pt-96  pb-20 bg-white">
        <div className="mx-20" id="booking">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl text-">Available Co-working Space</h1>
            <div className="">
              <span>Remaining Quota for today: </span>
              <UserQuota />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-9 py-10">
            {spaces
              ? spaces.data.map((item: SpaceItem) => (
                  <Link key={item.id} href={`/space/${item._id}`}>
                    <Card data={item} />
                  </Link>
                ))
              : Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton className="bg-[#E5E7EB] w-[427px] h-[320px] rounded-2xl shadow-2xl" key={i} />
                ))}
          </div>
        </div>
      </div>
    </main>
  );
}
