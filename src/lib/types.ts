import { ObjectId } from "mongodb";

// Common Location Interface used in multiple schemas if needed
export interface Location {
  latitude: number;
  longitude: number;
}

// User Schema (Collection: "users")
export interface User {
  _id?: ObjectId | string;
  name: string;
  email: string;
  password?: string; // Password is hashed in the database
  createdAt: Date;
}

// Volunteer Schema (Collection: "volunteers")
export interface Volunteer {
  _id?: ObjectId | string;
  name: string;
  email: string;
  phone: string;
  availability: string;
  message: string;
  createdAt: Date;
}

// Leftover Food Schema (Collection: "leftover_food")
export interface LeftoverFood {
  _id?: ObjectId | string;
  description: string;
  quantity: number;
  bestBeforeDate: Date;
  location: string;
  contact: string;
  userId: string; // References User._id
  createdAt: Date;
}
