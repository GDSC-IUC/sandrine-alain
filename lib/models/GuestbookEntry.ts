import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGuestbookEntry extends Document {
  authorName: string;
  message: string;
  createdAt: Date;
}

const GuestbookEntrySchema = new Schema<IGuestbookEntry>(
  {
    authorName: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const GuestbookEntry: Model<IGuestbookEntry> =
  mongoose.models.GuestbookEntry ??
  mongoose.model<IGuestbookEntry>("GuestbookEntry", GuestbookEntrySchema);

export default GuestbookEntry;
