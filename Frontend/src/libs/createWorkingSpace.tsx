import Swal from "sweetalert2";
export default async function createCoWorkingSpace(
  data: object,
  token: string
) {
  const response = await fetch(
    "https://cedt-se-project-mewing-komkom-nq7g.vercel.app/api/v1/workingspace",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const ans = await response.json();

    Swal.fire({
      title: "Error!",
      text: ans.message || "Create Failed",
      icon: "error",
    });
  } else {
    Swal.fire({
      title: "Success!",
      text: "Create successfully",
      icon: "success",
    });
    return await response.json();
  }
}
