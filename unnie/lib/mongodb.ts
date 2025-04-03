// lib/mongodb.ts

import mongoose, { Schema, MongooseConnectOptions } from "mongoose";

declare global {
  var mongoose: any;
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongoDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: MongooseConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// ... โค้ดส่วนอื่น ๆ ของคุณ

// ... โค้ดส่วนอื่น ๆ ของคุณ

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

const Outfit =
  mongoose.models.Outfit<IOutfit> ||
  mongoose.model<IOutfit>("Outfit", OutfitSchema);

export async function createOutfit(outfitData: any) {
  try {
    await connectMongoDB();
    const outfit = await Outfit.create(outfitData);
    return outfit;
  } catch (error) {
    console.error("Error creating outfit:", error);
    return null;
  }
}

export async function getOutfits() {
  try {
    await connectMongoDB();
    const outfits = await Outfit.find({});
    return outfits;
  } catch (error) {
    console.error("Error fetching outfits:", error);
    return [];
  }
}