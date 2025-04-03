"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState(""); // เพิ่ม state สำหรับที่อยู่จัดส่ง
  const router = useRouter();

  const handleRegister = () => {
    // เพิ่มโค้ดสำหรับส่งข้อมูลการสมัครสมาชิกไปยังเซิร์ฟเวอร์
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Address:", address); // แสดงที่อยู่จัดส่ง
    // หลังจากสมัครสมาชิกสำเร็จ อาจจะ redirect ไปหน้า login หรือหน้าอื่น ๆ
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">สมัครสมาชิก</h2>

        <input
          type="text"
          placeholder="ชื่อ"
          className="w-full p-2 border rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <input
          type="text"
          placeholder="ที่อยู่จัดส่ง"
          className="w-full p-2 border rounded mb-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded mt-2"
          onClick={handleRegister}
        >
          สมัครสมาชิก
        </button>

        <button
          className="w-full bg-gray-300 text-gray-700 p-2 rounded mt-2"
          onClick={() => router.push("/login")}
        >
          เข้าสู่ระบบ
        </button>

        <div className="flex justify-end mt-4">
          <button
            className="text-sm text-blue-500"
            onClick={() => router.push("/")}
          >
            ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  );
}