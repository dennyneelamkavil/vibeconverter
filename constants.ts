import { WeirdUnit, StandardUnit } from './types';

export const WEIRD_UNITS_DB: WeirdUnit[] = [
  // --- MASS: LOW VIBE (Cute/Relatable) ---
  { id: "honda_civic", name: "Honda Civics (2001)", unit_type: "mass", value_in_base_unit: 1100, base_unit: "kg", vibe_level: "low", emoji: "🚗" },
  { id: "golden_retriever", name: "Golden Retrievers", unit_type: "mass", value_in_base_unit: 30, base_unit: "kg", vibe_level: "low", emoji: "🐕" },
  { id: "iphone_14", name: "iPhone 14s", unit_type: "mass", value_in_base_unit: 0.172, base_unit: "kg", vibe_level: "low", emoji: "📱" },
  { id: "brick", name: "Red Clay Bricks", unit_type: "mass", value_in_base_unit: 2.3, base_unit: "kg", vibe_level: "low", emoji: "🧱" },
  { id: "basketball", name: "NBA Basketballs", unit_type: "mass", value_in_base_unit: 0.62, base_unit: "kg", vibe_level: "low", emoji: "🏀" },

  // --- MASS: MEDIUM VIBE (Animals/Celebs) ---
  { id: "african_elephant", name: "African Elephants", unit_type: "mass", value_in_base_unit: 6000, base_unit: "kg", vibe_level: "medium", emoji: "🐘" },
  { id: "the_rock", name: "Dwayne 'The Rock' Johnsons", unit_type: "mass", value_in_base_unit: 118, base_unit: "kg", vibe_level: "medium", emoji: "💪" },
  { id: "capybara", name: "Adult Capybaras", unit_type: "mass", value_in_base_unit: 50, base_unit: "kg", vibe_level: "medium", emoji: "🥔" },
  { id: "sumo_wrestler", name: "Sumo Wrestlers", unit_type: "mass", value_in_base_unit: 150, base_unit: "kg", vibe_level: "medium", emoji: "🥋" },
  { id: "grand_piano", name: "Grand Pianos", unit_type: "mass", value_in_base_unit: 450, base_unit: "kg", vibe_level: "medium", emoji: "🎹" },

  // --- MASS: HIGH VIBE (Specific/Odd) ---
  { id: "chicken_nugget", name: "McDonald's Chicken Nuggets", unit_type: "mass", value_in_base_unit: 0.016, base_unit: "kg", vibe_level: "high", emoji: "🍗" },
  { id: "human_brain", name: "Human Brains", unit_type: "mass", value_in_base_unit: 1.4, base_unit: "kg", vibe_level: "high", emoji: "🧠" },
  { id: "gold_bar", name: "Standard Gold Bars", unit_type: "mass", value_in_base_unit: 12.4, base_unit: "kg", vibe_level: "high", emoji: "💰" },
  { id: "hamster", name: "Dwarf Hamsters", unit_type: "mass", value_in_base_unit: 0.05, base_unit: "kg", vibe_level: "high", emoji: "🐹" },
  { id: "blue_whale", name: "Blue Whales", unit_type: "mass", value_in_base_unit: 150000, base_unit: "kg", vibe_level: "high", emoji: "🐋" },

  // --- MASS: UNHINGED VIBE (Abstract/Extreme) ---
  // Note: We map these to 'high' vibe_level so they appear when 'Unhinged' is selected
  { id: "human_soul", name: "Human Souls (MacDougall Theory)", unit_type: "mass", value_in_base_unit: 0.021, base_unit: "kg", vibe_level: "high", emoji: "👻" },
  { id: "titanic", name: "RMS Titanics", unit_type: "mass", value_in_base_unit: 52310000, base_unit: "kg", vibe_level: "high", emoji: "🚢" },
  { id: "proton", name: "Protons", unit_type: "mass", value_in_base_unit: 1.67e-27, base_unit: "kg", vibe_level: "high", emoji: "⚛️" },
  { id: "great_pyramid", name: "Great Pyramids of Giza", unit_type: "mass", value_in_base_unit: 5900000000, base_unit: "kg", vibe_level: "high", emoji: "🐫" },
  { id: "internet", name: "The Entire Internet (Weight of Electrons)", unit_type: "mass", value_in_base_unit: 0.05, base_unit: "kg", vibe_level: "high", emoji: "💻" },

  // --- LENGTH: LOW VIBE ---
  { id: "subway_footlong", name: "Subway Footlongs", unit_type: "length", value_in_base_unit: 0.3, base_unit: "meters", vibe_level: "low", emoji: "🥖" },
  { id: "iphone_height", name: "iPhone 14 Height", unit_type: "length", value_in_base_unit: 0.147, base_unit: "meters", vibe_level: "low", emoji: "📱" },
  { id: "step", name: "Average Human Steps", unit_type: "length", value_in_base_unit: 0.76, base_unit: "meters", vibe_level: "low", emoji: "👣" },
  { id: "mattress", name: "Queen Size Mattresses", unit_type: "length", value_in_base_unit: 2.03, base_unit: "meters", vibe_level: "low", emoji: "🛏️" },

  // --- LENGTH: MEDIUM VIBE ---
  { id: "giraffe_neck", name: "Giraffe Necks", unit_type: "length", value_in_base_unit: 2.4, base_unit: "meters", vibe_level: "medium", emoji: "🦒" },
  { id: "shrek", name: "Shreks", unit_type: "length", value_in_base_unit: 2.13, base_unit: "meters", vibe_level: "medium", emoji: "👹" },
  { id: "school_bus", name: "School Buses", unit_type: "length", value_in_base_unit: 13.7, base_unit: "meters", vibe_level: "medium", emoji: "🚌" },
  { id: "burj_khalifa", name: "Burj Khalifas", unit_type: "length", value_in_base_unit: 828, base_unit: "meters", vibe_level: "medium", emoji: "🏙️" },
  { id: "hollywood_sign", name: "Hollywood Letters (Height)", unit_type: "length", value_in_base_unit: 13.7, base_unit: "meters", vibe_level: "medium", emoji: "🎬" },

  // --- LENGTH: HIGH VIBE ---
  { id: "spaghetti_noodle", name: "Uncooked Spaghetti", unit_type: "length", value_in_base_unit: 0.25, base_unit: "meters", vibe_level: "high", emoji: "🍝" },
  { id: "banana", name: "Bananas (For Scale)", unit_type: "length", value_in_base_unit: 0.18, base_unit: "meters", vibe_level: "high", emoji: "🍌" },
  { id: "cvs_receipt", name: "CVS Receipts (Average)", unit_type: "length", value_in_base_unit: 0.8, base_unit: "meters", vibe_level: "high", emoji: "🧾" },
  { id: "eiffel_tower", name: "Eiffel Towers", unit_type: "length", value_in_base_unit: 330, base_unit: "meters", vibe_level: "high", emoji: "🗼" },
  { id: "blue_whale_length", name: "Blue Whales (Length)", unit_type: "length", value_in_base_unit: 24, base_unit: "meters", vibe_level: "high", emoji: "🐋" },

  // --- LENGTH: UNHINGED VIBE ---
  { id: "everest", name: "Mount Everests", unit_type: "length", value_in_base_unit: 8848, base_unit: "meters", vibe_level: "high", emoji: "🏔️" },
  { id: "mariana_trench", name: "Mariana Trenches (Depth)", unit_type: "length", value_in_base_unit: 11034, base_unit: "meters", vibe_level: "high", emoji: "🌊" },
  { id: "dna", name: "Human DNA Strands (Uncoiled)", unit_type: "length", value_in_base_unit: 2.0, base_unit: "meters", vibe_level: "high", emoji: "🧬" },
  { id: "light_nanosecond", name: "Light Nanoseconds", unit_type: "length", value_in_base_unit: 0.3, base_unit: "meters", vibe_level: "high", emoji: "⚡" },
  { id: "great_wall", name: "Great Walls of China", unit_type: "length", value_in_base_unit: 21196000, base_unit: "meters", vibe_level: "high", emoji: "🧱" },
];

export const STANDARD_UNITS: StandardUnit[] = [
  // --- MASS ---
  { id: 'kg', name: 'Kilograms', type: 'mass', label: 'kg', toBase: (v) => v },
  { id: 'g', name: 'Grams', type: 'mass', label: 'g', toBase: (v) => v / 1000 },
  { id: 'mg', name: 'Milligrams', type: 'mass', label: 'mg', toBase: (v) => v / 1000000 },
  { id: 'lbs', name: 'Pounds', type: 'mass', label: 'lbs', toBase: (v) => v * 0.453592 },
  { id: 'oz', name: 'Ounces', type: 'mass', label: 'oz', toBase: (v) => v * 0.0283495 },
  { id: 'ton_metric', name: 'Metric Tons', type: 'mass', label: 't', toBase: (v) => v * 1000 },
  { id: 'st', name: 'Stones (UK)', type: 'mass', label: 'st', toBase: (v) => v * 6.35029 },

  // --- LENGTH ---
  { id: 'm', name: 'Meters', type: 'length', label: 'm', toBase: (v) => v },
  { id: 'cm', name: 'Centimeters', type: 'length', label: 'cm', toBase: (v) => v / 100 },
  { id: 'mm', name: 'Millimeters', type: 'length', label: 'mm', toBase: (v) => v / 1000 },
  { id: 'km', name: 'Kilometers', type: 'length', label: 'km', toBase: (v) => v * 1000 },
  { id: 'ft', name: 'Feet', type: 'length', label: 'ft', toBase: (v) => v * 0.3048 },
  { id: 'in', name: 'Inches', type: 'length', label: 'in', toBase: (v) => v * 0.0254 },
  { id: 'yd', name: 'Yards', type: 'length', label: 'yd', toBase: (v) => v * 0.9144 },
  { id: 'mi', name: 'Miles', type: 'length', label: 'mi', toBase: (v) => v * 1609.34 },
  { id: 'nmi', name: 'Nautical Miles', type: 'length', label: 'nmi', toBase: (v) => v * 1852 },
  { id: 'ly', name: 'Light Years', type: 'length', label: 'ly', toBase: (v) => v * 9.461e15 },
];