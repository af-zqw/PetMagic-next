// Credit validation utilities

import { CREDIT_COSTS } from '../constants/credits';

export function hasSufficientCredits(
  currentCredits: number,
  type: 'image' | 'video'
): boolean {
  const cost = CREDIT_COSTS[type];
  return currentCredits >= cost;
}

export function calculateRemainingCredits(
  currentCredits: number,
  type: 'image' | 'video'
): number {
  const cost = CREDIT_COSTS[type];
  return Math.max(0, currentCredits - cost);
}
