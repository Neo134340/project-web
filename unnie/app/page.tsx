"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react";

// กำหนด type ให้กับ selectedOutfit
interface Outfit {
  id: string;
  image: string;
  name: string;
  brand: string;
  details: string;
  otherImages: string[];
}

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [showOutfitDetails, setShowOutfitDetails] = useState(false);
  const [cartItems, setCartItems] = useState<Outfit[]>([]);

  // ข้อมูลชุดใหม่และอัปเดตชุดเดิม
  const outfits: Outfit[] = [
    {
      id: "1",
      image: "https://cdn.wconcept.com/products/resize/632x843/migration/i/imgpin.wconceptusa.com/18647a1de60/36fd7/44/s0dWLfWXStJlYnd3qU-kFgkr0HA.png",
      name: "ชุดสบายๆ วันหยุด",
      brand: "แบรนด์ X",
      details: "ชุดลำลองสำหรับวันหยุดสุดสัปดาห์",
      otherImages: ["https://example.com/new1-1.jpg", "https://example.com/new1-2.jpg"],
    },
    {
      id: "2",
      image: "https://cdn.wconcept.com/products/resize/632x843/migration/i/imgpin.wconceptusa.com/18647a1de60/26839/49/pE2IPlnI73EQ0pkY49OH1bw9XqM.png",
      name: "ชุดทำงานสุดหรู",
      brand: "แบรนด์ Y",
      details: "ชุดทำงานที่ดูดีมีระดับ",
      otherImages: ["https://example.com/new2-1.jpg", "https://example.com/new2-2.jpg"],
    },
    {
      id: "3",
      image: "https://cdn.wconcept.com/products/resize/632x843/migration/i/imgpin.wconceptusa.com/18647a1de60/36fd7/44/s0dWLfWXStJlYnd3qU-kFgkr0HA.png",
      name: "ชุดปาร์ตี้",
      brand: "แบรนด์ Z",
      details: "ชุดปาร์ตี้ที่เหมาะกับทุกโอกาส",
      otherImages: ["https://example.com/new3-1.jpg", "https://example.com/new3-2.jpg"],
    },
    {
      id: "4",
      image: "https://cdn.wconcept.com/products/resize/632x843/migration/i/imgpin.wconceptusa.com/18647a1de60/36fd7/44/s0dWLfWXStJlYnd3qU-kFgkr0HA.png",
      name: "ชุดกีฬา",
      brand: "แบรนด์ Sporty",
      details: "ชุดออกกำลังกายที่ใส่สบาย",
      otherImages: ["https://example.com/new4-1.jpg", "https://example.com/new4-2.jpg"],
    },
    {
      id: "5",
      image: "https://cdn.wconcept.com/products/resize/632x843/migration/i/imgpin.wconceptusa.com/18647a1de60/36fd7/44/s0dWLfWXStJlYnd3qU-kFgkr0HA.png",
      name: "ชุดฤดูร้อน",
      brand: "แบรนด์ Summer",
      details: "ชุดสำหรับหน้าร้อนที่สดใส",
      otherImages: ["https://example.com/new5-1.jpg", "https://example.com/new5-2.jpg"],
    },
    // อัปเดต 5 ชุดเดิม
    {
      id: "6",
      image: "https://cdn.wconcept.com/products/resize/632x843/migration/i/imgpin.wconceptusa.com/18647a1de60/36fd7/44/s0dWLfWXStJlYnd3qU-kFgkr0HA.png",
      name: "ชุดแฟชั่นใหม่",
      brand: "แบรนด์ A+",
      details: "ชุดที่ได้รับการอัปเดตใหม่จากแบรนด์ A",
      otherImages: ["https://example.com/update1-1.jpg", "https://example.com/update1-2.jpg"],
    },
    {
      id: "7",
      image: "https://cdn.wconcept.com/products/resize/632x843/migration/i/imgpin.wconceptusa.com/18647a1de60/26839/49/pE2IPlnI73EQ0pkY49OH1bw9XqM.png",
      name: "ชุดคลาสสิก",
      brand: "แบรนด์ B+",
      details: "ชุดสไตล์คลาสสิกที่ไม่มีวันตกยุค",
      otherImages: ["https://example.com/update2-1.jpg", "https://example.com/update2-2.jpg"],
    },
    {
      id: "8",
      image: "https://cdn.wconcept.com/products/resize/632x843/migration/i/imgpin.wconceptusa.com/18647a1de60/36fd7/44/s0dWLfWXStJlYnd3qU-kFgkr0HA.png",
      name: "ชุดเรียบหรู",
      brand: "แบรนด์ C+",
      details: "ความหรูหราในแบบที่คุณต้องการ",
      otherImages: ["https://example.com/update3-1.jpg", "https://example.com/update3-2.jpg"],
    },
    {
      id: "9",
      image: "https://cdn.wconcept.com/products/resize/632x843/migration/i/imgpin.wconceptusa.com/18647a1de60/36fd7/44/s0dWLfWXStJlYnd3qU-kFgkr0HA.png",
      name: "ชุดโมเดิร์น",
      brand: "แบรนด์ D+",
      details: "ความทันสมัยที่ลงตัว",
      otherImages: ["https://example.com/update4-1.jpg", "https://example.com/update4-2.jpg"],
    },
    {
      id: "10",
      image: "https://cdn.wconcept.com/products/resize/632x843/migration/i/imgpin.wconceptusa.com/18647a1de60/36fd7/44/s0dWLfWXStJlYnd3qU-kFgkr0HA.png",
      name: "ชุดสไตล์วินเทจ",
      brand: "แบรนด์ E+",
      details: "เสน่ห์ของแฟชั่นยุคเก่า",
      otherImages: ["https://example.com/update5-1.jpg", "https://example.com/update5-2.jpg"],
    },
  ];

  // ฟังก์ชันสำหรับการค้นหาชุด
  const filteredOutfits = outfits.filter((outfit) => {
    const matchesSearch = outfit.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus
      ? outfit.name.includes(selectedStatus)
      : true;
    const matchesBrand = selectedBrand
      ? outfit.brand.includes(selectedBrand)
      : true;

    if (selectedStatus && selectedBrand) {
      return matchesSearch && matchesStatus && matchesBrand;
    } else if (selectedStatus) {
      return matchesSearch && matchesStatus;
    } else if (selectedBrand) {
      return matchesSearch && matchesBrand;
    } else {
      return matchesSearch;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation bar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={28} />
        </button>

        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="ค้นหาชุด..."
            className="border p-2 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => router.push("/Login")}>
            <User size={24} />
          </button>
          <Link href="/basket">
            <button>
              <ShoppingCart size={24} />
            </button>
          </Link>
          <button>
            <Search size={24} />
          </button>
        </div>
      </nav>

      {/* เมนู */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-4 transition-all duration-300 ease-in-out">
          <h2 className="text-xl mb-4">หมวดหมู่</h2>

          <div className="mb-4">
            <h3 className="font-medium">หมวดหมู่ชุด</h3>
            <ul>
              <li key="all" className="my-2">
                <button className="hover:underline">ชุดทั้งหมด</button>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-medium">แบรนด์</h3>
            <ul>
              {["แบรนด์ A", "แบรนด์ B", "แบรนด์ C", "แบรนด์ D", "แบรนด์ E"].map((brand, index) => (
                <li key={index} className="my-2">
                  <button className="hover:underline">{brand}</button>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="absolute top-4 right-4 text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            <X />
          </button>
        </div>
      )}

      {/* แสดงผล outfits */}
      <div className="p-4 grid grid-cols-5 gap-4">
        {filteredOutfits.map((outfit) => (
          <div
            key={outfit.id}
            className="bg-white p-2 shadow-md rounded-lg cursor-pointer"
          >
            <img
              src={outfit.image}
              alt={outfit.name}
              className="w-full h-[300px] object-cover rounded-md"
            />
            <h3 className="text-center font-medium mt-2">{outfit.name}</h3>
            <p className="text-center text-sm text-gray-500">{outfit.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
