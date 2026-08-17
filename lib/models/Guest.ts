import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGuest extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  attending: boolean;
  guestCount: number;
  dietaryReq: string;
  message?: string;
  tableNumber: number | null;
  qrCode: string;
  createdAt: Date;
}

const GuestSchema = new Schema<IGuest>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    attending: { type: Boolean, required: true },
    guestCount: { type: Number, default: 1, min: 1, max: 10 },
    dietaryReq: { type: String, default: "Aucun" },
    message: { type: String, trim: true },
    tableNumber: { type: Number, default: null },
    qrCode: { type: String, required: true },
  },
  { timestamps: true }
);

const Guest: Model<IGuest> =
  mongoose.models.Guest ?? mongoose.model<IGuest>("Guest", GuestSchema);

export default Guest;
