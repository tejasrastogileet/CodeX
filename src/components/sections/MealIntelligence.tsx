import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { THEME, BMI_COLORS } from '@/constants/theme';
import GlassmorphicCard from '@/components/premium/GlassmorphicCard';

interface Meal {
  id: string;
  name: string;
  cuisine: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  iron: number;
  nutritionScore: number;
  nutritionPerRupee: number;
  cost: number;
  isIronRich: boolean;
  isSeasonal: boolean;
  acceptanceRate: number;
  image?: string;
}

interface MealIntelligenceProps {
  selectedBmiCategory?: string;
}

const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Khichdi with Ghee & Vegetables',
    cuisine: 'Indian',
    category: 'Main Course',
    calories: 280,
    protein: 12,
    carbs: 45,
    fat: 8,
    iron: 3.2,
    nutritionScore: 85,
    nutritionPerRupee: 8.5,
    cost: 33,
    isIronRich: true,
    isSeasonal: false,
    acceptanceRate: 92,
    image: '🍛',
  },
  {
    id: '2',
    name: 'Spinach & Lentil Curry',
    cuisine: 'Indian',
    category: 'Main Course',
    calories: 250,
    protein: 18,
    carbs: 38,
    fat: 5,
    iron: 5.8,
    nutritionScore: 92,
    nutritionPerRupee: 9.2,
    cost: 29,
    isIronRich: true,
    isSeasonal: false,
    acceptanceRate: 78,
    image: '🥘',
  },
  {
    id: '3',
    name: 'Egg & Vegetable Rice',
    cuisine: 'Indian',
    category: 'Main Course',
    calories: 320,
    protein: 15,
    carbs: 42,
    fat: 10,
    iron: 2.8,
    nutritionScore: 88,
    nutritionPerRupee: 7.8,
    cost: 41,
    isIronRich: false,
    isSeasonal: false,
    acceptanceRate: 95,
    image: '🍚',
  },
  {
    id: '4',
    name: 'Millet Porridge with Jaggery',
    cuisine: 'Indian',
    category: 'Breakfast',
    calories: 200,
    protein: 8,
    carbs: 38,
    fat: 3,
    iron: 4.2,
    nutritionScore: 80,
    nutritionPerRupee: 9.8,
    cost: 20,
    isIronRich: true,
    isSeasonal: true,
    acceptanceRate: 85,
    image: '🥣',
  },
];

/**
 * Smart Meal Recommendation Engine
 * SaaS-style meal intelligence with filters and optimization
 */
export const MealIntelligence: React.FC<MealIntelligenceProps> = ({
  selectedBmiCategory = 'normal',
}) => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    bmi: selectedBmiCategory,
    cuisine: 'all',
    maxBudget: 50,
    category: 'all',
  });
  const [sortBy, setSortBy] = useState<'acceptance' | 'nutrition' | 'budget'>('acceptance');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  
  // Filter meals
  const filteredMeals = mockMeals.filter((meal) => {
    if (filters.cuisine !== 'all' && meal.cuisine !== filters.cuisine) return false;
    if (filters.category !== 'all' && meal.category !== filters.category) return false;
    if (meal.cost > filters.maxBudget) return false;
    return true;
  });
  
  // Sort meals
  const sortedMeals = [...filteredMeals].sort((a, b) => {
    if (sortBy === 'acceptance') return b.acceptanceRate - a.acceptanceRate;
    if (sortBy === 'nutrition') return b.nutritionScore - a.nutritionScore;
    return a.cost - b.cost;
  });
  
  return (
    <section className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1
            className="text-4xl font-bold"
            style={{ color: THEME.colors.primary[500] }}
          >
            {t('meals.title')}
          </h1>
          <p className="mt-2 text-gray-600">
            AI-optimized meals for better nutrition and acceptance
          </p>
        </motion.div>
        
        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 rounded-2xl p-6"
          style={{
            background: THEME.gradients.card,
            border: `1px solid ${THEME.colors.gray[200]}`,
          }}
        >
          <h2 className="mb-6 font-bold" style={{ color: THEME.colors.gray[900] }}>
            {t('meals.filter')}
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Cuisine Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                {t('meals.cuisine')}
              </label>
              <select
                value={filters.cuisine}
                onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                className="mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
                style={{
                  borderColor: THEME.colors.gray[200],
                  focusRingColor: THEME.colors.primary[500],
                }}
              >
                <option value="all">All Cuisines</option>
                <option value="Indian">Indian</option>
              </select>
            </div>
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                {t('meals.category')}
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
                style={{
                  borderColor: THEME.colors.gray[200],
                }}
              >
                <option value="all">All Categories</option>
                <option value="Main Course">Main Course</option>
                <option value="Breakfast">Breakfast</option>
              </select>
            </div>
            
            {/* Budget Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                {t('meals.budget')} - ₹{filters.maxBudget}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={filters.maxBudget}
                onChange={(e) => setFilters({ ...filters, maxBudget: parseInt(e.target.value) })}
                className="mt-2 w-full"
              />
            </div>
            
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                {t('meals.filter')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="mt-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
                style={{
                  borderColor: THEME.colors.gray[200],
                }}
              >
                <option value="acceptance">Highest Acceptance</option>
                <option value="nutrition">Best Nutrition</option>
                <option value="budget">Best Value</option>
              </select>
            </div>
            
            {/* Clear Filters */}
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-lg px-4 py-2 font-semibold text-white transition-all"
                style={{
                  background: `linear-gradient(135deg, ${THEME.colors.gray[400]}, ${THEME.colors.gray[500]})`,
                }}
              >
                Reset
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Meals Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {sortedMeals.map((meal) => (
            <motion.div key={meal.id} variants={itemVariants}>
              <GlassmorphicCard hover>
                {/* Image Placeholder */}
                <div
                  className="mb-4 flex h-32 items-center justify-center rounded-xl text-5xl"
                  style={{ background: `${THEME.colors.primary[500]}15` }}
                >
                  {meal.image}
                </div>
                
                {/* Meal Name & Cuisine */}
                <h3 className="font-bold" style={{ color: THEME.colors.gray[900] }}>
                  {meal.name}
                </h3>
                <p className="text-xs text-gray-500">{meal.cuisine}</p>
                
                {/* Badges */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {meal.isIronRich && (
                    <span
                      className="inline-block rounded-full px-2 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: THEME.colors.danger }}
                    >
                      🩸 Iron-Rich
                    </span>
                  )}
                  {meal.isSeasonal && (
                    <span
                      className="inline-block rounded-full px-2 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: THEME.colors.accent[400] }}
                    >
                      🌱 Seasonal
                    </span>
                  )}
                </div>
                
                {/* Nutrition Info */}
                <div className="mt-4 space-y-2 border-t pt-4" style={{ borderColor: THEME.colors.gray[200] }}>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Calories</span>
                    <span className="font-semibold">{meal.calories} kcal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Protein</span>
                    <span className="font-semibold">{meal.protein}g</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Iron</span>
                    <span className="font-semibold">{meal.iron}mg</span>
                  </div>
                </div>
                
                {/* Acceptance Rate */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-600">Acceptance</span>
                    <span style={{ color: THEME.colors.accent[400] }}>
                      {meal.acceptanceRate}%
                    </span>
                  </div>
                  <div
                    className="mt-2 h-2 rounded-full"
                    style={{ backgroundColor: `${THEME.colors.accent[400]}30` }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${meal.acceptanceRate}%` }}
                      transition={{ delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: THEME.colors.accent[400] }}
                    />
                  </div>
                </div>
                
                {/* Cost */}
                <div className="mt-4 flex items-center justify-between border-t pt-4" style={{ borderColor: THEME.colors.gray[200] }}>
                  <span className="text-xs font-medium text-gray-600">Cost per Serving</span>
                  <span className="font-bold" style={{ color: THEME.colors.primary[500] }}>
                    ₹{meal.cost}
                  </span>
                </div>
                
                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full rounded-lg py-2 font-semibold text-white transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${THEME.colors.primary[500]}, ${THEME.colors.accent[400]})`,
                  }}
                >
                  View Recipe →
                </motion.button>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MealIntelligence;
