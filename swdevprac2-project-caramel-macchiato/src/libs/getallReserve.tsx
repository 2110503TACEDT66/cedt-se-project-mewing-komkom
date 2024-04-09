export default async function getAllReservation(token: string) {
  const response = await fetch(
    "https://presentation-day-1-caramel-macchiato.vercel.app/api/v1/reservation",
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {

    throw new Error("Failed to fetch user");
  }

  return await response.json();
}
