import { useQuery } from '@tanstack/react-query';
import { fetchMenu, fetchFeaturedMenu, fetchCategories } from '../services/api';
import { MenuItem } from '../types';

const SYNC_INTERVAL = 3000; // 3 seconds polling

export function useMenuQuery() {
  return useQuery<MenuItem[], Error>({
    queryKey: ['menu'],
    queryFn: fetchMenu,
    refetchInterval: SYNC_INTERVAL,
    refetchOnWindowFocus: true,
    staleTime: 2000,
  });
}

export function useFeaturedMenuQuery() {
  return useQuery<MenuItem[], Error>({
    queryKey: ['menu', 'featured'],
    queryFn: fetchFeaturedMenu,
    refetchInterval: SYNC_INTERVAL,
    refetchOnWindowFocus: true,
    staleTime: 2000,
  });
}

export function useCategoriesQuery() {
  return useQuery<string[], Error>({
    queryKey: ['menu', 'categories'],
    queryFn: fetchCategories,
    refetchInterval: SYNC_INTERVAL * 2, // Categories change less frequently
    refetchOnWindowFocus: true,
    staleTime: 5000,
  });
}
