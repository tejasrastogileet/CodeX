export interface Child {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  heightCm: number;
  weightKg: number;
  bmi: number;
  bmiCategory: BmiCategory;
  createdAt: string;
  updatedAt: string;
}

export type BmiCategory = 'severely_underweight' | 'underweight' | 'normal' | 'overweight';

export interface BmiRecord {
  id: string;
  childId: string;
  date: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  category: BmiCategory;
}

export interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  iron: number;
  ingredients: string[];
  instructions: string[];
  cuisine: string;
  category: string;
  nutritionScore: number;
  costPerServing?: number;
  isIronRich: boolean;
  isSeasonal: boolean;
}

export interface AcceptanceLog {
  id: string;
  childId: string;
  recipeId: string;
  recipeName: string;
  date: string;
  status: 'fully_eaten' | 'partially_eaten' | 'mostly_wasted';
  mealType: 'breakfast' | 'lunch' | 'snack';
}

export interface FlavorPairing {
  ingredient1: string;
  ingredient2: string;
  compatibilityScore: number;
  sharedCompounds: number;
  recommendation: 'excellent' | 'good' | 'moderate' | 'poor';
}

export interface NutritionSummary {
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  totalIron: number;
  nutritionScore: number;
  costPerNutrient?: number;
}
