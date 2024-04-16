import Swal from "sweetalert2";

export default async function userLogIn(
  username: string,
  userPassword: string
) {
  const response = await fetch(
    `${process.env.BACKEND_URI}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: userPassword,
      }),
    }
  );
  if (!response.ok) {
    const ans = await response.json();

   Swal.fire({
      title: "Error!",
      text: ans.message || "Failed to Login",
      icon: "error",
    });
  }
  const profileData = await response.json();

  return profileData;
}
