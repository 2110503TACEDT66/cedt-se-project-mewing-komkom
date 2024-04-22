import Swal from "sweetalert2";
import { SpaceItem } from "../../interface";
export default async function updateWorkingSpace(
  id: string,
  token: string,
  data:SpaceItem
) {
  const body = JSON.stringify(data); // Construct the request body

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/workingspace/` + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    }
  );



  if (!response.ok) {
    const ans = await response.json();

    Swal.fire({
      title: "Error!",
      text: ans.message || "Cannot Update #" + id,
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