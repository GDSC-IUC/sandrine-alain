import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Global cache to prevent multiple connections in development (hot-reloading)
const cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = 
  (global as unknown as { mongoose: typeof cached }).mongoose ?? { conn: null, promise: null };

(global as unknown as { mongoose: typeof cached }).mongoose = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error("MongoDB is not configured. Define the MONGODB_URI environment variable.");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
