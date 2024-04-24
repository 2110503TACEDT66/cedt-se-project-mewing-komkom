import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import getAllReservation from "@/libs/getallReserve";
import { Reservation } from "../../../../../interface";
import ReservationItem from "@/components/Reservationitem";

export default async function managePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const reservations = await getAllReservation(session.user.token);
  const reservationData = reservations.data;
  return (
    <main>
      <div>
        <div className="text-3xl m-4">All Reservation</div>
        {reservationData.map((reservation: Reservation) => (
          <ReservationItem reservation={reservation} />
        ))}
      </div>
    </main>
  );
}
