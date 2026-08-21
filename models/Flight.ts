import mongoose from 'mongoose';

export interface IFlight {
  airline: string;
  flightNumber: string;
  origin: {
    code: string;
    city: string;
    airport: string;
    terminal?: string;
  };
  destination: {
    code: string;
    city: string;
    airport: string;
    terminal?: string;
  };
  departure: {
    date: Date;
    time: string;
  };
  arrival: {
    date: Date;
    time: string;
  };
  duration: string;
  stops: number;
  price: {
    amount: number;
    currency: string;
  };
  class: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  availableSeats: number;
  bookingCode?: string;
  status: 'available' | 'booked' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const FlightSchema = new mongoose.Schema<IFlight>(
  {
    airline: {
      type: String,
      required: true,
    },
    flightNumber: {
      type: String,
      required: true,
    },
    origin: {
      code: { type: String, required: true },
      city: { type: String, required: true },
      airport: { type: String, required: true },
      terminal: { type: String },
    },
    destination: {
      code: { type: String, required: true },
      city: { type: String, required: true },
      airport: { type: String, required: true },
      terminal: { type: String },
    },
    departure: {
      date: { type: Date, required: true },
      time: { type: String, required: true },
    },
    arrival: {
      date: { type: Date, required: true },
      time: { type: String, required: true },
    },
    duration: {
      type: String,
      required: true,
    },
    stops: {
      type: Number,
      default: 0,
    },
    price: {
      amount: { type: Number, required: true },
      currency: { type: String, default: 'NGN' },
    },
    class: {
      type: String,
      enum: ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'],
      default: 'ECONOMY',
    },
    availableSeats: {
      type: Number,
      default: 50,
    },
    bookingCode: {
      type: String,
    },
    status: {
      type: String,
      enum: ['available', 'booked', 'cancelled'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.models.Flight || mongoose.model<IFlight>('Flight', FlightSchema);

export default Flight;