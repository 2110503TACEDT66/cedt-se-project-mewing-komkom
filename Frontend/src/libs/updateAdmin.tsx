import Swal from "sweetalert2";

export default async function updateAdmin(
  id: string,
  name:string,
  email:string,
  tel:string,
  role:string,
  token: string,


) {
//   const body = JSON.stringify({ reserveDate: date }); // Construct the request body

  const response = await fetch(
   `${process.env.NEXT_PUBLIC_BACKEND_URI}/edit/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        tel: tel,
        role: role

      }), // Include the request body
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
