"use client";
import { LogEditReservation, Reservation } from "../../../interface";
import DeleteReservation from "@/libs/deleteReserve";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ReservationLogItem({
  logEdit,
}: {
  logEdit: LogEditReservation;
}) {
  const session = useSession();
  const router = useRouter();

  const [hide, setHide] = useState("");
  const datebefore = dayjs(logEdit.afterEditStartTime).format("DD MMMM YYYY");
  const dateafter = dayjs(logEdit.beforeEditStartTime).format("DD MMMM YYYY");
  const startTimeafter = dayjs(logEdit.afterEditStartTime)
    .tz("Asia/Bangkok")
    .format("HH:mm");
  const endTimeafter = dayjs(logEdit.afterEditEndTime)
    .tz("Asia/Bangkok")
    .format("HH:mm");
  const startTimebefore = dayjs(logEdit.beforeEditStartTime)
    .tz("Asia/Bangkok")
    .format("HH:mm");
  const endTimebefore = dayjs(logEdit.beforeEditEndTime)
    .tz("Asia/Bangkok")
    .format("HH:mm");
  const reservationDate = dayjs(logEdit.reservationOrigin.startTime).format(
    "DD MMMM YYYY"
  );
  const reservationTimeStart = dayjs(logEdit.reservationOrigin.startTime)
    .tz("Asia/Bangkok")
    .format("HH:mm");
  const reservationTimeEnd = dayjs(logEdit.reservationOrigin.endTime)
    .tz("Asia/Bangkok")
    .format("HH:mm");

  return (
    <div key={logEdit._id} className={`border p-4 my-4 ${hide}`}>
      <h1 className="text-xl font-medium mb-2">
        {logEdit.reservationOrigin
          ? logEdit.reservationOrigin.workingSpace.name
          : "canceled reservation"}
      </h1>
      <table className="border-separate border-spacing-x-3">
        <tbody>
          <tr>
            <td>Date</td>
            {logEdit.action == "edit" && (
              <td>
                <span className="line-through">{datebefore}</span> to{" "}
                {dateafter}
              </td>
            )}

            {logEdit.action == "cancel" ||
              (logEdit.action == "forceCancel" && (
                <td>
                  <span>{reservationDate} </span>
                </td>
              ))}
          </tr>
          <tr>
            <td>Time</td>
            {logEdit.action == "edit" && (
              <td>
                <span className="line-through">
                  {startTimebefore} - {endTimebefore}
                </span>{" "}
                to {startTimeafter} - {endTimeafter}
              </td>
            )}

            {logEdit.action == "cancel" ||
              (logEdit.action == "forceCancel" && (
                <td>
                  {reservationTimeStart} - {reservationTimeEnd}
                </td>
              ))}
          </tr>
          <tr>
            <td>User</td>
            <td className="tracking-wide">
              {logEdit.reservationOrigin.user.name}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end">
        <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {logEdit.action}
        </button>
      </div>
    </div>
  );
}
