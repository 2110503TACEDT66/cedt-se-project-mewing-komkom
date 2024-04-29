import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import getAllReservation from "@/libs/getallReserve";
import { Reservation } from "../../../../../interface";
import ReservationItem from "@/components/Reservationitem";
import Link from "next/link";
export default async function managePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const reservations = await getAllReservation(session.user.token);
  const reservationData = reservations.data;
  return (
    <main>
      <div>
        <div className="flex justify-between">
          <div className="text-3xl m-4">All Reservation</div>
          <Link
            href={"/booking/history"}
            className="mt-2 h-11 bg-slate-300 py-2 px-4 rounded-full duration-200 hover:bg-slate-400"
          >
            <p>{"History"}</p>
          </Link>
        </div>
        {reservationData.map((reservation: Reservation) => (
          <ReservationItem reservation={reservation} datatestid={"reservationtest"}/>
        ))}
      </div>
    </main>
  );
}
