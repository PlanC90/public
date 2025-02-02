export interface User {
  id: number;
  telegram_username: string;
  rating: number;
  total_ratings: number;
  created_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  token_name: string;
  order_type: 'buy' | 'sell';
  amount: number;
  price: number;
  status: string;
  created_at: string;
  user?: User;
}

export interface Rating {
  id: number;
  from_user_id: number;
  to_user_id: number;
  rating: number;
  created_at: string;
}