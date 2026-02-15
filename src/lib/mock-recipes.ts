import { Recipe } from '@/types';

export const mockRecipes: Recipe[] = [
  {
    id: '1', name: 'Dal Tadka with Rice', calories: 450, protein: 18, fat: 12, carbs: 65,
    fiber: 8, iron: 4.5, ingredients: ['Toor dal', 'Rice', 'Ghee', 'Cumin', 'Turmeric', 'Tomato', 'Onion'],
    instructions: ['Wash and pressure cook dal for 3 whistles', 'Cook rice separately', 'Prepare tadka with ghee, cumin, garlic', 'Pour tadka over dal and serve with rice'],
    cuisine: 'Indian', category: 'Main Course', nutritionScore: 82, costPerServing: 25, isIronRich: true, isSeasonal: true,
  },
  {
    id: '2', name: 'Paneer Paratha', calories: 380, protein: 15, fat: 18, carbs: 42,
    fiber: 4, iron: 2.1, ingredients: ['Whole wheat flour', 'Paneer', 'Green chili', 'Coriander', 'Salt'],
    instructions: ['Knead soft dough', 'Prepare paneer filling with spices', 'Stuff and roll parathas', 'Cook on tawa with ghee'],
    cuisine: 'Indian', category: 'Breakfast', nutritionScore: 75, costPerServing: 30, isIronRich: false, isSeasonal: true,
  },
  {
    id: '3', name: 'Egg Bhurji with Roti', calories: 420, protein: 22, fat: 20, carbs: 38,
    fiber: 5, iron: 3.8, ingredients: ['Eggs', 'Whole wheat roti', 'Onion', 'Tomato', 'Green chili', 'Turmeric'],
    instructions: ['Heat oil and sauté onions', 'Add tomatoes and spices', 'Scramble eggs until cooked', 'Serve hot with roti'],
    cuisine: 'Indian', category: 'Main Course', nutritionScore: 85, costPerServing: 20, isIronRich: true, isSeasonal: true,
  },
  {
    id: '4', name: 'Rajma Chawal', calories: 480, protein: 20, fat: 8, carbs: 78,
    fiber: 12, iron: 5.2, ingredients: ['Kidney beans', 'Rice', 'Onion', 'Tomato', 'Ginger', 'Garlic', 'Spices'],
    instructions: ['Soak rajma overnight', 'Pressure cook until soft', 'Prepare masala gravy', 'Simmer rajma in gravy and serve with rice'],
    cuisine: 'Indian', category: 'Main Course', nutritionScore: 88, costPerServing: 22, isIronRich: true, isSeasonal: true,
  },
  {
    id: '5', name: 'Poha', calories: 280, protein: 6, fat: 8, carbs: 48,
    fiber: 3, iron: 3.0, ingredients: ['Flattened rice', 'Peanuts', 'Onion', 'Curry leaves', 'Turmeric', 'Lemon'],
    instructions: ['Wash and drain poha', 'Roast peanuts', 'Sauté onion and curry leaves', 'Add poha and mix well', 'Squeeze lemon and serve'],
    cuisine: 'Indian', category: 'Breakfast', nutritionScore: 68, costPerServing: 12, isIronRich: true, isSeasonal: true,
  },
  {
    id: '6', name: 'Khichdi', calories: 320, protein: 14, fat: 6, carbs: 55,
    fiber: 7, iron: 3.5, ingredients: ['Moong dal', 'Rice', 'Ghee', 'Cumin', 'Turmeric', 'Vegetables'],
    instructions: ['Wash rice and dal together', 'Add vegetables and spices', 'Pressure cook for 4 whistles', 'Add ghee and serve hot'],
    cuisine: 'Indian', category: 'Main Course', nutritionScore: 80, costPerServing: 15, isIronRich: true, isSeasonal: true,
  },
  {
    id: '7', name: 'Vegetable Upma', calories: 260, protein: 8, fat: 10, carbs: 38,
    fiber: 5, iron: 2.0, ingredients: ['Semolina', 'Mixed vegetables', 'Mustard seeds', 'Curry leaves', 'Cashews'],
    instructions: ['Roast semolina until golden', 'Sauté vegetables with mustard seeds', 'Add water and semolina', 'Cook until fluffy'],
    cuisine: 'Indian', category: 'Breakfast', nutritionScore: 72, costPerServing: 14, isIronRich: false, isSeasonal: true,
  },
  {
    id: '8', name: 'Chole with Puri', calories: 520, protein: 16, fat: 22, carbs: 68,
    fiber: 10, iron: 4.8, ingredients: ['Chickpeas', 'Whole wheat flour', 'Onion', 'Tomato', 'Chole masala', 'Oil'],
    instructions: ['Soak chickpeas overnight and cook', 'Prepare spicy gravy', 'Simmer chickpeas in gravy', 'Make puris and deep fry', 'Serve hot together'],
    cuisine: 'Indian', category: 'Main Course', nutritionScore: 78, costPerServing: 28, isIronRich: true, isSeasonal: true,
  },
  {
    id: '9', name: 'Banana Sheera', calories: 300, protein: 5, fat: 10, carbs: 50,
    fiber: 2, iron: 1.0, ingredients: ['Semolina', 'Banana', 'Milk', 'Sugar', 'Ghee', 'Cardamom'],
    instructions: ['Roast semolina in ghee', 'Mash banana and add', 'Pour milk and sugar', 'Cook until thick', 'Garnish with cardamom'],
    cuisine: 'Indian', category: 'Snack', nutritionScore: 55, costPerServing: 18, isIronRich: false, isSeasonal: true,
  },
  {
    id: '10', name: 'Palak Dal', calories: 350, protein: 16, fat: 8, carbs: 52,
    fiber: 9, iron: 6.0, ingredients: ['Spinach', 'Moong dal', 'Garlic', 'Cumin', 'Turmeric', 'Ghee'],
    instructions: ['Cook dal until soft', 'Blanch and puree spinach', 'Mix spinach into dal', 'Prepare tadka with garlic and cumin', 'Serve with rice or roti'],
    cuisine: 'Indian', category: 'Main Course', nutritionScore: 90, costPerServing: 20, isIronRich: true, isSeasonal: true,
  },
];

export function getRecipesForCategory(bmiCategory: string): Recipe[] {
  switch (bmiCategory) {
    case 'severely_underweight':
      return mockRecipes.filter(r => r.protein >= 15 && r.calories >= 400).sort((a, b) => b.calories - a.calories);
    case 'underweight':
      return mockRecipes.filter(r => r.protein >= 14).sort((a, b) => b.protein - a.protein);
    case 'normal':
      return mockRecipes.filter(r => r.nutritionScore >= 70).sort((a, b) => b.nutritionScore - a.nutritionScore);
    case 'overweight':
      return mockRecipes.filter(r => r.calories <= 350).sort((a, b) => a.calories - b.calories);
    default:
      return mockRecipes;
  }
}
