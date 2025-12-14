'use client';

import { useEffect } from 'react';
import useAppStore from '@/lib/store/useAppStore';

export default function StoreHydration() {
  useEffect(() => {
    useAppStore.getState().hydrate();
  }, []);

  return null;
}
