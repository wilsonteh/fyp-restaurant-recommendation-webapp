export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size: number;
  className?: string;
}; 

// ImagePreview interface for review photo in review form 
export interface ImagePreview extends File {
  preview: string;
  id: string;
};

// Photo interface for RestaurantPhotoGrid & review photo 
export interface Photo {
  url: string;
  width: number;
  height: number;
};

// paramters for calling Nearby Search API 
export interface NearbySearchParams {
  location: { latitude: string; longitude: string };
  radius: string;
  keyword?: string[];
  maxprice?: 1 | 2 | 3 | 4;
  minprice?: 1 | 2 | 3 | 4;
  opennow?: boolean; 
  pagetoken?: string;
  rankby?: "prominence" | "distance"; 
  type?: string;
}

// each restaurant item's types returned from Nearby-Search API 
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


