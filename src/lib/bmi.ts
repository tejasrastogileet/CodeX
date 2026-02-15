import { BmiCategory } from '@/types';

export function calculateBmi(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
}

export function getBmiCategory(bmi: number, age: number): BmiCategory {
  // Simplified child BMI categories (WHO-inspired thresholds)
  if (age <= 5) {
    if (bmi < 13) return 'severely_underweight';
    if (bmi < 14.5) return 'underweight';
    if (bmi < 18) return 'normal';
    return 'overweight';
  }
  // Ages 6-14
  if (bmi < 13.5) return 'severely_underweight';
  if (bmi < 15) return 'underweight';
  if (bmi < 22) return 'normal';
  return 'overweight';
}

export function getBmiColor(category: BmiCategory): string {
  switch (category) {
    case 'severely_underweight': return 'hsl(var(--bmi-severe))';
    case 'underweight': return 'hsl(var(--bmi-underweight))';
    case 'normal': return 'hsl(var(--bmi-normal))';
    case 'overweight': return 'hsl(var(--bmi-overweight))';
  }
}

export function getBmiLabel(category: BmiCategory): string {
  switch (category) {
    case 'severely_underweight': return '🔴 Severely Underweight';
    case 'underweight': return '🟡 Underweight';
    case 'normal': return '🟢 Normal';
    case 'overweight': return '🟠 Overweight';
  }
}

export function getBmiEmoji(category: BmiCategory): string {
  switch (category) {
    case 'severely_underweight': return '🔴';
    case 'underweight': return '🟡';
    case 'normal': return '🟢';
    case 'overweight': return '🟠';
  }
}
