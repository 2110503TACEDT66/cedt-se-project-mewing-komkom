export default async function getUserReservationQuota(
  token: string,
  date?: string
) {
  const requestBody = date ? { selectedDate: date } : {};

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/reservation/quota`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user quota");
  }

  return await response.json();
}
