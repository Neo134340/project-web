"use client";

import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation"; // ใช้ useRouter สำหรับการนำทาง

// กำหนด interface สำหรับ CartItem
interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

export default function Basket() {
  // สร้าง state สำหรับเก็บสินค้าที่อยู่ในตะกร้า
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // สร้าง state สำหรับเก็บสถานะการจัดส่ง
  const [shippingStatus, setShippingStatus] = useState<string>("");
  // สร้าง state สำหรับเก็บสินค้าที่ถูกเช่าไปแล้ว
  const [rentedItems, setRentedItems] = useState<CartItem[]>([]);
  // ควบคุมการเปิด/ปิด Modal
  const [isModalOpen, setIsModalOpen] = useState(true);
  // ใช้ useRouter hook เพื่อเปลี่ยนหน้า
  const router = useRouter();

  useEffect(() => {
    // ดึงข้อมูลสินค้าในตะกร้าจาก localStorage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    // เรียก API เพื่อดึงสถานะการจัดส่ง
    fetch("/api/shipping")
      .then((res) => res.json())
      .then((data) => setShippingStatus(data.status))
      .catch((error) => console.error("Error fetching shipping status:", error));

    // เรียก API เพื่อดึงข้อมูลสินค้าที่เช่า
    fetch("/api/rented")
      .then((res) => res.json())
      .then((data) => setRentedItems(data.items))
      .catch((error) => console.error("Error fetching rented items:", error));

    // กำหนด appElement สำหรับ Modal เพื่อให้ใช้งานกับ Next.js ได้
    const nextElement = document.getElementById("__next");
    if (nextElement) {
      Modal.setAppElement(nextElement);
    } else {
      console.error("Element #__next not found.");
    }
  }, []);

  // ฟังก์ชันปิด Modal และนำทางกลับไปที่หน้าหลัก
  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/"); // กลับไปยังหน้าแรก
  };

  return (
    <Modal
      isOpen={isModalOpen} // ควบคุมการเปิด Modal
      onRequestClose={closeModal} // ปิด Modal เมื่อกดปิด
      contentLabel="ตะกร้าสินค้า"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
          width: "30%",
          height: "50%",
          margin: "auto",
        },
      }}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">ตะกร้าสินค้า</h2>
        <ul>
          {/* แสดงรายการสินค้าในตะกร้า */}
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center mb-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
              <div>
                <h3>{item.name}</h3>
                <p>ราคา: {item.price} บาท</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">สถานะการจัดส่ง</h2>
        <p>{shippingStatus}</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">สินค้าที่เช่า</h2>
        <ul>
          {/* แสดงรายการสินค้าที่ถูกเช่า */}
          {rentedItems.map((item) => (
            <li key={item.id} className="flex items-center mb-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
              <div>
                <h3>{item.name}</h3>
                <p>ราคา: {item.price} บาท</p>
              </div>
            </li>
          ))}
        </ul>

        {/* ปุ่มปิด Modal */}
        <button onClick={closeModal}>ปิด</button>
      </div>
    </Modal>
  );
}