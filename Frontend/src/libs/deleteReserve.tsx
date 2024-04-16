import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default async function DeleteReservation(id: string, token: string) {
  const response = await fetch(
    "https://presentation-day-1-caramel-macchiato.vercel.app/api/v1/reservation/" +
      id,
    {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const ans = await response.json();
    Swal.fire({
      title: "Error!",
      text: ans.message || "Delete Failed",
      icon: "error",
    });
  } else {
    Swal.fire({
      title: "Success!",
      text: "Deleted successfully",
      icon: "success",
    });

    return await response.json();
  }
}
