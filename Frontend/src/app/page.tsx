import getSpaces from "@/libs/getSpaces";
import Banner from "../components/Banner";
import Card from "@/components/Card";
import Link from "next/link";
import { SpaceItem, SpaceJson } from "../../interface";
import ModalCreateNew from "@/components/admin/ModalCreateNew";
import ModalCreateNewHandle from "@/components/admin/ModalCreateNewHandle";
import checkAvailableSeat from "@/libs/checkAvailableSeat";
import dayjs from "dayjs";
import QuotaBanner from "@/components/QuotaBanner";

export default async function Home() {
  const spaces: SpaceJson = await getSpaces();

  return (
    <main>
      <Banner />
      <div className="-mt-96 pt-96  pb-20 bg-white">
        <div className="mx-20" id="booking">
          <div className="">
            <h1 className="text-5xl text-">Available Co-working Space</h1>
            <QuotaBanner />
          </div>
          <div className="grid grid-cols-4 gap-9 py-10">
            {spaces.data.map((item: SpaceItem) => (
              <Link key={item.id} href={`/space/${item._id}`}>
                <Card data={item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
