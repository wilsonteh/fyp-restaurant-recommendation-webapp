interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Period {
  close: {
    date: string;
    day: number;
    time: string;
  };
  open: {
    date: string;
    day: number;
    time: string;
  };
}

interface OpeningHours {
  open_now: boolean;
  periods: Period[];
  weekday_text: string[];
}

interface Location {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface Geometry {
  location: Location;
  viewport: Viewport;
}

interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

interface Review {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface RestaurantDetailInterface {
  address_components: AddressComponent[];
  adr_address: string;
  business_status: string;
  curbside_pickup: boolean;
  current_opening_hours: OpeningHours;
  delivery: boolean;
  dine_in: boolean;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  international_phone_number: string;
  name: string;
  opening_hours: OpeningHours;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  price_level: number;
  rating: number;
  reference: string;
  reservable: boolean;
  reviews: Review[];
  serves_beer: boolean;
  serves_breakfast: boolean;
  serves_brunch: boolean;
  serves_dinner: boolean;
  serves_lunch: boolean;
  serves_vegetarian_food: boolean;
  serves_wine: boolean;
  takeout: boolean;
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
  wheelchair_accessible_entrance: boolean;
  [key: string]: any;
}
