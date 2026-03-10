export type PropertyType = 'vacation' | 'rent' | 'buy';
export type PropertyStatus = 'draft' | 'active' | 'paused' | 'rented' | 'sold';
export type PriceUnit = 'night' | 'month' | 'sale';
export type UserRole = 'user' | 'owner' | 'manager' | 'admin';
export type SwipeDirection = 'left' | 'right';
export type MatchStatus = 'active' | 'contacted' | 'in_process' | 'closed';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: UserRole;
  company_name: string | null;
  partner_network: boolean;
  location_lat: number | null;
  location_lng: number | null;
  created_at: string;
}

export interface Property {
  id: string;
  owner_id: string;
  type: PropertyType;
  status: PropertyStatus;
  title: string;
  description: string | null;
  address: string | null;
  city: string;
  province: string;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  max_guests: number | null;
  price: number;
  price_unit: PriceUnit;
  min_nights: number | null;
  tourist_license: string | null;
  checkin_time: string | null;
  checkout_time: string | null;
  amenities: string[];
  images: string[];
  is_boosted: boolean;
  boost_expires_at: string | null;
  is_featured: boolean;
  managed_by: string | null;
  manager_id: string | null;
  swipe_right_count: number;
  swipe_left_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface Swipe {
  id: string;
  user_id: string;
  property_id: string;
  direction: SwipeDirection;
  created_at: string;
}

export interface Match {
  id: string;
  user_id: string;
  property_id: string;
  status: MatchStatus;
  created_at: string;
  property?: Property;
}

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  owner_id: string;
  plan: 'free' | 'basic' | 'premium' | 'agency';
  max_listings: number;
  stripe_subscription_id: string | null;
  status: string;
  current_period_end: string | null;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  user_id: string;
  property_id: string;
  service_type: string;
  status: string;
  price: number | null;
  notes: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  property_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Filters {
  type: PropertyType;
  zone: string;
  priceRange: { min: number; max: number };
  bedrooms: number | null; // null = todas
}

export interface Conversation {
  match_id: string;
  property: Property;
  other_user: Profile;
  last_message: Message | null;
  unread_count: number;
}
