import { Timestamp } from "firebase/firestore";

// Based on Firestore's Review collection schema
export interface ReviewSchema {
  rating: {
    main: number;
    food: number;
    service: number;
    value: number;
    atmosphere: number;
  }
  title: string;
  comment: string;
  imageUrls: string[]
  priceLevel: string;
  hasHalalOption: string;
  hasVegetarianOption: string;
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
};

export interface FavouritesSchema {
  restaurantId: string;
  userId: string;
  createdAt: Timestamp;
}