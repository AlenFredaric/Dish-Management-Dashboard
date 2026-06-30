import { MenuItem, Reservation } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${API_BASE_URL}/api/menu`);
  if (!res.ok) {
    throw new Error('Failed to fetch the culinary menu');
  }
  return res.json();
}

export async function fetchFeaturedMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${API_BASE_URL}/api/menu/featured`);
  if (!res.ok) {
    throw new Error('Failed to fetch chef recommendation menu');
  }
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/api/menu/categories`);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
}

// Mock reservation submission to display loading and success transitions
export async function submitReservation(data: Reservation): Promise<{ success: boolean; bookingId: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic checks for mock purposes
      if (data.guests <= 0) {
        reject(new Error('Guest count must be greater than zero.'));
      } else {
        resolve({
          success: true,
          bookingId: `MC-${Math.floor(1000 + Math.random() * 9000)}`,
        });
      }
    }, 1500); // 1.5s simulated loading latency
  });
}
