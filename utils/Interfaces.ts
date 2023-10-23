export interface IconProps {
  className?: string;
  color?: string;
  fill?: string;
  stroke?: string;
}

export interface NearbySearchRestaurant {
  business_status: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: {
    open_now: boolean;
  };
  photos: {
    height: number;
      html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  price_level: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
}

export interface SelectedRestaurant {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      south: number;
      west: number;
      north: number;
      east: number;
    };
  };
  name: string;
  opening_hours: {
    open_now: boolean;
    periods: {
      close: {
        day: number;
        time: string;
        hours: number;
        minutes: number;
      };
      open: {
        day: number;
        time: string;
        hours: number;
        minutes: number;
      };
    }[];
    weekday_text: string[];
  };
  photos: {
    height: number;
    html_attributions: string[];
    width: number;
    getUrl: () => string;
  }[];
  place_id: string;
  html_attributions: string[];
};




