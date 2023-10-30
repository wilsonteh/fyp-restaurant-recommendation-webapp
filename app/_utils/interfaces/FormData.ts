export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
};

export interface LoginFormData {
  email: string;
  password: string;
};

export interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
  priceLevel: string;
  halal: boolean;
  vegetarian: boolean;
};