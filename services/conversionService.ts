import { STANDARD_UNITS, WEIRD_UNITS_DB } from '../constants';
import { UiVibe, VibeLevel, WeirdUnit } from '../types';

export const mapUiVibeToLevel = (uiVibe: UiVibe): VibeLevel => {
  switch (uiVibe) {
    case 'Boring': return 'low';
    case 'Quirky': return 'medium';
    case 'Wild': return 'high';
    case 'Unhinged': return 'unhinged';
  }
};

export const getWeirdUnit = (type: 'mass' | 'length', vibe: VibeLevel, excludeId?: string): WeirdUnit | null => {
  // Filter by type and vibe
  let candidates = WEIRD_UNITS_DB.filter(u => u.unit_type === type && u.vibe_level === vibe);

  // If we have an exclusion and enough candidates to pick a different one, filter it out
  if (excludeId && candidates.length > 1) {
    candidates = candidates.filter(u => u.id !== excludeId);
  }

  if (candidates.length === 0) {
    // Fallback: relax vibe constraint
    let fallback = WEIRD_UNITS_DB.filter(u => u.unit_type === type);
    if (excludeId && fallback.length > 1) {
      fallback = fallback.filter(u => u.id !== excludeId);
    }

    if (fallback.length === 0) return null;
    return fallback[Math.floor(Math.random() * fallback.length)];
  }

  // Pick random
  return candidates[Math.floor(Math.random() * candidates.length)];
};

export const calculateConversion = (
  amount: number,
  fromUnitId: string,
  vibe: UiVibe,
  excludeUnitId?: string
): { value: number; unit: WeirdUnit } | null => {
  const standardUnit = STANDARD_UNITS.find(u => u.id === fromUnitId);
  if (!standardUnit) return null;

  const baseValue = standardUnit.toBase(amount);
  const vibeLevel = mapUiVibeToLevel(vibe);

  const targetUnit = getWeirdUnit(standardUnit.type, vibeLevel, excludeUnitId);
  if (!targetUnit) return null;

  const value = baseValue / targetUnit.value_in_base_unit;

  return {
    value,
    unit: targetUnit
  };
};