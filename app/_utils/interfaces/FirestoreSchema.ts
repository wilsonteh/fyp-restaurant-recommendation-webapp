import { Timestamp } from "firebase/firestore";

// Based on Firestore's Review collection schema
export interface ReviewSchema {
  toJSON(): any;
  rating: number;
  title: string;
  comment: string;
  priceLevel: string;
  hasHalalOption: string;
  hasVegetarianOption: string;
  // likeCount: number;
  likes: {
    count: number;
    likedBy: string[]
  }
  createdAt: Timestamp;
  restaurantId: string;
  user: {
    id: string;
    displayName: string;
    avatarUrl: string;
  };
}