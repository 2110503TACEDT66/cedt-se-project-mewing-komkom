export default async function checkAvailableSeat(data:any,id: String) {
    

    const response = await fetch(
     `${process.env.NEXT_PUBLIC_BACKEND_URI}/workingspace/available/${id}`,
     {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mode": "cors"
        },
        body: JSON.stringify(data),
      }
    );
  
    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch space");
    }
  
    return await response.json();
  }