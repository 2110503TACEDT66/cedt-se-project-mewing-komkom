export default async function getAllReservation(
  token: string,
  filter?: "today" | "past" | "future"
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/reservation + ${
      filter ? `?filter=${filter}` : ""
    }`,
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
