import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { THEME } from '@/constants/theme';
import GlassmorphicCard from '@/components/premium/GlassmorphicCard';

/**
 * Nutrition Analytics Dashboard
 * Comprehensive nutrition metrics with charts
 */
export const NutritionAnalytics: React.FC = () => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  
  // Mock data
  const dailyNutrition = [
    { day: 'Mon', calories: 1850, protein: 65, carbs: 220 },
    { day: 'Tue', calories: 1920, protein: 72, carbs: 235 },
    { day: 'Wed', calories: 1780, protein: 58, carbs: 210 },
    { day: 'Thu', calories: 2050, protein: 78, carbs: 245 },
    { day: 'Fri', calories: 1920, protein: 72, carbs: 235 },
    { day: 'Sat', calories: 2150, protein: 85, carbs: 260 },
    { day: 'Sun', calories: 1850, protein: 65, carbs: 220 },
  ];
  
  const macronutrients = [
    { name: 'Protein', value: 30, color: '#10B981' },
    { name: 'Carbs', value: 55, color: '#3B82F6' },
    { name: 'Fats', value: 15, color: '#F59E0B' },
  ];
  
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
  
  return (
    <section className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center justify-between"
        >
          <div>
            <h1
              className="text-4xl font-bold"
              style={{ color: THEME.colors.primary[500] }}
            >
              {t('analytics.title')}
            </h1>
            <p className="mt-2 text-gray-600">
              Real-time nutrition metrics for your children
            </p>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex gap-2">
            {(['day', 'week', 'month'] as const).map((range) => (
              <motion.button
                key={range}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTimeRange(range)}
                className="rounded-lg px-4 py-2 font-semibold transition-all capitalize"
                style={{
                  background:
                    timeRange === range
                      ? `linear-gradient(135deg, ${THEME.colors.primary[500]}, ${THEME.colors.accent[400]})`
                      : THEME.colors.gray[100],
                  color: timeRange === range ? '#fff' : THEME.colors.gray[700],
                }}
              >
                {range}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Top Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 grid gap-6 sm:grid-cols-4"
        >
          {[
            {
              label: 'Avg Daily Calories',
              value: '1,936',
              change: '+5%',
              icon: '🔥',
              target: '1,800-2,000',
            },
            {
              label: 'Avg Protein',
              value: '71g',
              change: '+12%',
              icon: '💪',
              target: '60-80g',
            },
            {
              label: 'Iron Intake',
              value: '14.2mg',
              change: '+8%',
              icon: '🩸',
              target: '12-15mg',
            },
            {
              label: 'Nutrition Score',
              value: '8.5/10',
              change: '+2%',
              icon: '⭐',
              target: 'Excellent',
            },
          ].map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <GlassmorphicCard hover>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="mt-2 text-2xl font-bold" style={{ color: THEME.colors.gray[900] }}>
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Target: {stat.target}</p>
                  </div>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                
                <div
                  className="mt-4 rounded-full px-2 py-1 text-xs font-semibold"
                  style={{
                    background: `${THEME.colors.accent[400]}20`,
                    color: THEME.colors.accent[400],
                  }}
                >
                  {stat.change} this week
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Charts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 lg:grid-cols-2"
        >
          {/* Daily Nutrition Bar Chart */}
          <motion.div variants={itemVariants}>
            <GlassmorphicCard hover={false}>
              <h3 className="mb-6 text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                📊 Daily Nutrition ({timeRange.charAt(0).toUpperCase() + timeRange.slice(1)})
              </h3>
              
              <div style={{ height: '200px' }} className="flex items-end justify-around gap-2">
                {dailyNutrition.map((day, idx) => (
                  <div key={idx} className="flex-1">
                    <div className="flex flex-col items-center gap-2">
                      {/* Bar */}
                      <div className="w-full">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(day.calories / 2500) * 150}px` }}
                          transition={{ delay: idx * 0.1, duration: 0.6 }}
                          className="mx-auto rounded-t"
                          style={{
                            width: '60%',
                            background: `linear-gradient(180deg, ${THEME.colors.primary[500]}, ${THEME.colors.accent[400]})`,
                          }}
                        />
                      </div>
                      
                      {/* Label */}
                      <p className="text-xs font-medium text-gray-600">{day.day}</p>
                      <p className="text-xs font-bold" style={{ color: THEME.colors.primary[500] }}>
                        {day.calories}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div
                className="mt-6 border-t pt-4"
                style={{ borderColor: THEME.colors.gray[200] }}
              >
                <p className="text-xs text-gray-600">
                  Average: 1,936 kcal | Target: 1,800-2,000 kcal ✅
                </p>
              </div>
            </GlassmorphicCard>
          </motion.div>
          
          {/* Macronutrient Pie Chart */}
          <motion.div variants={itemVariants}>
            <GlassmorphicCard hover={false}>
              <h3 className="mb-6 text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                🥗 Macronutrient Distribution
              </h3>
              
              <div className="flex items-center justify-between">
                {/* Pie Chart */}
                <div style={{ width: '150px', height: '150px' }} className="relative">
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                    {macronutrients.map((macro, idx) => {
                      const startAngle = macronutrients.slice(0, idx).reduce((sum, m) => sum + (m.value * 3.6), 0);
                      const endAngle = startAngle + macro.value * 3.6;
                      
                      const radius = 40;
                      const x1 = 50 + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
                      const y1 = 50 + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
                      const x2 = 50 + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
                      const y2 = 50 + radius * Math.sin((endAngle - 90) * (Math.PI / 180));
                      
                      const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                      
                      return (
                        <motion.path
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          d={`M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                          style={{ fill: macro.color }}
                          transition={{ delay: idx * 0.2 }}
                        />
                      );
                    })}
                  </svg>
                </div>
                
                {/* Legend */}
                <div className="space-y-3">
                  {macronutrients.map((macro, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: macro.color }}
                      />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: THEME.colors.gray[900] }}>
                          {macro.name}
                        </p>
                        <p className="text-xs text-gray-600">{macro.value}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div
                className="mt-6 border-t pt-4"
                style={{ borderColor: THEME.colors.gray[200] }}
              >
                <p className="text-xs text-gray-600">
                  Balanced distribution ✅ | Target: 30-35% protein, 50-60% carbs, 10-15% fats
                </p>
              </div>
            </GlassmorphicCard>
          </motion.div>
          
          {/* Weekly Trends */}
          <motion.div variants={itemVariants}>
            <GlassmorphicCard hover={false}>
              <h3 className="mb-6 text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                📈 Weekly Trend
              </h3>
              
              <div className="space-y-4">
                {[
                  { label: 'Protein', value: 72, unit: 'g', trend: '+12%', color: THEME.colors.accent[400] },
                  { label: 'Calories', value: 1936, unit: 'kcal', trend: '+5%', color: THEME.colors.primary[500] },
                  { label: 'Iron', value: 14.2, unit: 'mg', trend: '+8%', color: THEME.colors.danger },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{item.label}</span>
                      <span style={{ color: item.color }}>
                        {item.value}{item.unit}
                        <span className="text-xs text-gray-600 ml-1">{item.trend}</span>
                      </span>
                    </div>
                    <div
                      className="mt-2 h-2 rounded-full"
                      style={{
                        background: `${item.color}20`,
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ delay: idx * 0.2, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassmorphicCard>
          </motion.div>
          
          {/* Budget Efficiency */}
          <motion.div variants={itemVariants}>
            <GlassmorphicCard hover={false}>
              <h3 className="mb-6 text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                💰 Budget Efficiency
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span>Nutrition per Rupee</span>
                    <span style={{ color: THEME.colors.accent[400] }}>8.5/10</span>
                  </div>
                  <div
                    className="h-3 rounded-full"
                    style={{ background: `${THEME.colors.accent[400]}20` }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: THEME.colors.accent[400] }}
                    />
                  </div>
                </div>
                
                <div
                  className="mt-4 rounded-lg p-4"
                  style={{ background: `${THEME.colors.accent[400]}10` }}
                >
                  <p className="text-sm font-semibold">Weekly Budget: ₹2,450</p>
                  <p className="mt-2 text-xs text-gray-600">
                    Average per child per day: ₹35 | Status: {' '}
                    <span style={{ color: THEME.colors.accent[400] }}>Under Budget ✅</span>
                  </p>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NutritionAnalytics;
