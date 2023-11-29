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
  rating: {
    main: number;
    food: number;
    service: number;
    value: number;
    atmosphere: number;
  }
  title: string;
  comment: string;
  priceLevel: string;
  hasHalalOption: boolean;
  hasVegetarianOption: boolean;
};

export interface FilterOptionsFormData {
  distance: string;
  opennow: boolean; 
  pricing: {
    '0': boolean;
    '1': boolean;
    '2': boolean;
    '3': boolean;
    '4': boolean;
  };
}