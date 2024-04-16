"use client";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import registerUser from "@/libs/createUser";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onSubmit = () => {
    registerUser({
      name: name,
      tel: tel,
      email: email,
      password: password,
    }).then(() => {
      router.push("/");
    });
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
        </div>
      </div>
    </div>
  );
}
