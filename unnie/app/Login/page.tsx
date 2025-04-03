"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">เข้าสู่ระบบ</h2>
        
        <input
          type="email"
          placeholder="อีเมล"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="รหัสผ่าน"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded mt-2">เข้าสู่ระบบ</button>

        <button
          className="w-full bg-gray-300 text-gray-700 p-2 rounded mt-2"
          onClick={() => router.push("/register")}
        >
          สมัครสมาชิก
        </button>

        <div className="flex justify-between mt-4">
          <button className="text-sm text-gray-500">ลืมรหัสผ่าน?</button>
          <button className="text-sm text-blue-500" onClick={() => router.push("/")}>
            ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  );
}
