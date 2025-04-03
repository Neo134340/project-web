// models/Outfit.ts

import mongoose, { Schema } from "mongoose";

interface IOutfit {
  imageUrl: string;
  name: string;
  brand: string;
  details: string;
  price: number;
  colors?: string[];
  sizes?: string[];
  tags?: string[];
  otherImages?: string[];
  // เพิ่มฟิลด์อื่น ๆ ที่คุณต้องการเก็บ
}

const OutfitSchema = new Schema<IOutfit>({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  details: { type: String, required: true },
  price: { type: Number, required: true },
  colors: { type: [String] },
  sizes: { type: [String] },
  tags: { type: [String] },
  otherImages: { type: [String] },
  // เพิ่มฟิลด์อื่น ๆ ที่คุณต้องการเก็บ
});

export default mongoose.models.Outfit<IOutfit> ||
  mongoose.model<IOutfit>("Outfit", OutfitSchema);