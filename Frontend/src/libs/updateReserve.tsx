import Swal from "sweetalert2";
export default async function UpdateReservation(
  id: string,
  token: string,
  date: string
) {
  const body = JSON.stringify({ reserveDate: date }); // Construct the request body

  const response = await fetch(
   `${process.env.BACKEND_URI}/reservation/` +
      id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body, // Include the request body
    }
  );
  if (!response.ok) {
    const ans = await response.json();

    Swal.fire({
      title: "Error!",
      text: ans.message ||"Cannot Update #" + id,
      icon: "error",
    });
  } else {
    Swal.fire({
      title: "Success!",
      text: "Update successfully",
      icon: "success",
    });

    return await response.json();
  }
}
