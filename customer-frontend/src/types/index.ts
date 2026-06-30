export interface MenuItem {
  dishId: string;
  dishName: string;
  imageUrl: string;
  isPublished: boolean;
  price: number;
  category: string;
  chefPick: boolean;
  rating: number;
  preparationTime: string;
  description: string;
  calories: number;
}

export interface Reservation {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'indoor' | 'outdoor' | 'bar' | 'chefs-table';
  specialRequests?: string;
}
