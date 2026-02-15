import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { THEME } from '@/constants/theme';
import GlassmorphicCard from '@/components/premium/GlassmorphicCard';

interface TopMeal {
  rank: number;
  name: string;
  acceptanceRate: number;
  mealsServed: number;
  children: number;
  nutritionScore: number;
}

const topMeals: TopMeal[] = [
  {
    rank: 1,
    name: 'Khichdi with Vegetables',
    acceptanceRate: 95,
    mealsServed: 156,
    children: 24,
    nutritionScore: 92,
  },
  {
    rank: 2,
    name: 'Egg & Rice',
    acceptanceRate: 92,
    mealsServed: 142,
    children: 22,
    nutritionScore: 88,
  },
  {
    rank: 3,
    name: 'Spinach Dal',
    acceptanceRate: 88,
    mealsServed: 128,
    children: 20,
    nutritionScore: 94,
  },
  {
    rank: 4,
    name: 'Millet Porridge',
    acceptanceRate: 85,
    mealsServed: 102,
    children: 18,
    nutritionScore: 86,
  },
];

/**
 * Community Learning Section
 * Shareable insights and best meals
 */
export const CommunityLearning: React.FC = () => {
  const { t } = useLanguage();
  
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
  
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return THEME.colors.gray[400];
    }
  };
  
  return (
    <section className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1
            className="text-4xl font-bold"
            style={{ color: THEME.colors.primary[500] }}
          >
            {t('community.title')}
          </h1>
          <p className="mt-2 text-gray-600">
            Learn from successful meals across your community
          </p>
        </motion.div>
        
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 rounded-2xl p-8"
          style={{
            background: `linear-gradient(135deg, ${THEME.colors.primary[500]}20, ${THEME.colors.accent[400]}20)`,
            border: `1px solid ${THEME.colors.primary[500]}30`,
          }}
        >
          <h2 className="text-2xl font-bold" style={{ color: THEME.colors.primary[500] }}>
            🌍 This Week's Success Stories
          </h2>
          <p className="mt-2 text-gray-700">
            These meals achieved the highest acceptance rates and nutrition scores. Prepare them next week for optimal results!
          </p>
        </motion.div>
        
        {/* Top Meals Ranking */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {topMeals.map((meal) => (
            <motion.div
              key={meal.rank}
              variants={itemVariants}
              whileHover={{ x: 4 }}
            >
              <GlassmorphicCard hover>
                <div className="flex items-center gap-6">
                  {/* Rank Badge */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full font-bold text-white text-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${getRankColor(meal.rank)}, ${getRankColor(meal.rank)}dd)`,
                    }}
                  >
                    #{meal.rank}
                  </motion.div>
                  
                  {/* Meal Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                      {meal.name}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-6 text-sm">
                      <div>
                        <span className="text-gray-600">Acceptance Rate</span>
                        <p className="font-bold" style={{ color: THEME.colors.accent[400] }}>
                          {meal.acceptanceRate}%
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Meals Served</span>
                        <p className="font-bold" style={{ color: THEME.colors.primary[500] }}>
                          {meal.mealsServed}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Children</span>
                        <p className="font-bold" style={{ color: THEME.colors.info }}>
                          {meal.children}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Nutrition</span>
                        <p className="font-bold" style={{ color: THEME.colors.accent[400] }}>
                          {meal.nutritionScore}/100
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg px-6 py-3 font-bold text-white transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.colors.primary[500]}, ${THEME.colors.accent[400]})`,
                    }}
                  >
                    Use →
                  </motion.button>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="mb-6 text-2xl font-bold" style={{ color: THEME.colors.gray[900] }}>
            💡 Community Insights
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '🎯',
                title: 'Consistency Wins',
                description: 'Top meals served 2-3 times per week showed 23% higher acceptance',
              },
              {
                icon: '🌱',
                title: 'Seasonal Impact',
                description: 'Locally available vegetables improved nutrition scores by 28%',
              },
              {
                icon: '👥',
                title: 'Staff Tips',
                description: '94% of workers recommend warm, freshly prepared meals',
              },
            ].map((insight, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="rounded-xl p-6"
                style={{
                  background: THEME.gradients.card,
                  border: `1px solid ${THEME.colors.gray[200]}`,
                }}
              >
                <span className="text-3xl">{insight.icon}</span>
                <h3 className="mt-3 font-bold" style={{ color: THEME.colors.gray[900] }}>
                  {insight.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Share Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <GlassmorphicCard hover={false}>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: THEME.colors.gray[900] }}>
                  📢 Share Your Success
                </h2>
                <p className="mt-2 text-gray-600">
                  Have a meal that worked well? Tell us about it so other Anganwadi workers can benefit!
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl px-8 py-4 font-bold text-white transition-all hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${THEME.colors.accent[400]}, ${THEME.colors.primary[500]})`,
                }}
              >
                📝 Submit Your Meal
              </motion.button>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityLearning;
