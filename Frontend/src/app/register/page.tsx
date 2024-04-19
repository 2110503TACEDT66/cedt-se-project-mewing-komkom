"use client";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import registerUser from "@/libs/createUser";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Register() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();


  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setError("")

      if (!email || !password || !name || !tel) {
        setError("Please enter complete information.");
        
        return;
      }

      if (password.length < 6) {
        setError("Password must have more than 6 ");
        
        return;
      }

      const telRegex = /^\d+$/;
      if (tel.length !== 10) {
        setError("Please enter a valid phone number with 10 digits.");
        
        return;
      }
      if (!telRegex.test(tel)) {
        setError("Please enter a only digits");
        
        return;
      }

      const user = await registerUser({
        name: name,
        tel: tel,
        email: email,
        password: password,
      });
      console.log({ user });
      if (!user) {
        setError("Register Error");
        
        return;
      }

      if (user.success === false) {
        setError("This email is already use.");
        
        return;
      }

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials");
        
        return;
      }

      console.log("going to router");
      router.refresh();
      router.replace("/");
    } catch (error) {
      console.log("Error from login" + error);
      
    }
  };

  return (
    <div className="flex justify-center my-20   ">
      <div className="bg-white p-10 rounded-3xl">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold">สมัครสมาชิก</h1>
          <TextField
            id="outlined-basic"
            label="ชื่อ"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            id="outlined-basic"
            label="เบอร์โทร"
            variant="outlined"
            required
            onChange={(e) => setTel(e.target.value)}
            value={tel}
          />
          <TextField
            id="outlined-basic"
            label="อีเมล"
            variant="outlined"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            id="outlined-basic"
            label="รหัสผ่าน"
            variant="outlined"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            className="bg-black text-white w-full rounded py-3"
            onClick={onSubmit}
          >
            สมัคร
          </button>
          {error && (
              <div className=" text-center bg-red-700 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
