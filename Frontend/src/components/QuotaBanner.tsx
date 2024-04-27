"use client";
import getUserReservationQuota from "@/libs/getUserReservationQuota";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function QuotaBanner() {
  const [quota, setQuota] = useState<null | number>(null);
  const { data: session } = useSession();
  if (!session) return null;

  useEffect(() => {
    const fetchQuota = async () => {
      const userQuota = await getUserReservationQuota(session.user.token);
      setQuota(userQuota.data);
    };
    fetchQuota();
  }, []);

  if (quota === null) return <>loading</>;
  return <div>{quota}</div>;
}
