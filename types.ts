export type UnitType = 'mass' | 'length';
export type VibeLevel = 'low' | 'medium' | 'high';
export type UiVibe = 'Boring' | 'Quirky' | 'Unhinged';

export interface WeirdUnit {
  id: string;
  name: string;
  unit_type: UnitType;
  value_in_base_unit: number;
  base_unit: string; // 'kg' or 'meters'
  vibe_level: VibeLevel;
  emoji: string;
}

export interface ConversionHistoryItem {
  id: string;
  originalAmount: number;
  originalUnit: string;
  convertedAmount: number;
  convertedUnit: string;
  emoji: string;
  timestamp: Date;
}

export interface StandardUnit {
  id: string;
  name: string;
  type: UnitType;
  toBase: (val: number) => number; // Converts to kg or meters
  label: string;
}
