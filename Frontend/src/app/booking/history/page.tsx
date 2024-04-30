import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import ReservationLogItem from "@/components/reservationHistory/reseravtionLogItem";
import getLogReservation from "@/libs/getLogReservation";
import { LogEditReservation } from "../../../../interface";
export default async function historyPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const logEdit = await getLogReservation(session.user.token);
  const logeditData = logEdit.data;
  return (
    <main>
      <div>
        <div className="text-3xl m-4">Reservation History</div>
        <div data-testid="reservationLog">
          {logeditData.map((logedit: LogEditReservation) => (
            <ReservationLogItem logEdit={logedit} data-testid="reservationLog"/>
          ))}
        </div>
        
      </div>
    </main>
  );
}
