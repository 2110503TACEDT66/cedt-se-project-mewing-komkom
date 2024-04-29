"use client";
import getUserReservationQuota from "@/libs/getUserReservationQuota";
import { Dayjs } from "dayjs";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type TPropQuotaBanner = {
  selectedDate?: Dayjs;
};
export default function QuotaBanner({ selectedDate }: TPropQuotaBanner) {
  const [quota, setQuota] = useState<null | number>(null);
  const { data: session } = useSession();
  if (!session) return null;

  useEffect(() => {
    const fetchQuota = async () => {
      const userQuota = await getUserReservationQuota(
        session.user.token,
        selectedDate?.toString()
      );
      setQuota(userQuota.data);
    };
    fetchQuota();
  }, [selectedDate]);

  return quota;
}
