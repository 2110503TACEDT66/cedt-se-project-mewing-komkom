export default async function getSpaces() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await fetch(
    "https://presentation-day-1-caramel-macchiato.vercel.app/api/v1/workingspace",{next:{tags:['co-working spaces']}}
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Spaces");
  }

  return await response.json();
}
