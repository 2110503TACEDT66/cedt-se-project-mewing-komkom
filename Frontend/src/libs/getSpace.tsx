export default async function getSpace(id: String) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    const response = await fetch(
      "https://presentation-day-1-caramel-macchiato.vercel.app/api/v1/workingspace/" + id
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch space");
    }
  
    return await response.json();
  }
  