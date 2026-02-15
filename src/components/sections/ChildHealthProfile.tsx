import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { THEME } from '@/constants/theme';
import BMIBadge from '@/components/premium/BMIBadge';
import GlassmorphicCard from '@/components/premium/GlassmorphicCard';

interface ChildHealthProfileProps {
  childId?: string;
  onBack?: () => void;
}

/**
 * Child Health Profile Dashboard
 * Mini health dashboard for individual children
 */
export const ChildHealthProfile: React.FC<ChildHealthProfileProps> = ({
  childId = '1',
  onBack,
}) => {
  const { language, t } = useLanguage();
  const [child] = useState({
    id: childId,
    name: 'Aisha Sharma',
    age: 6,
    height: 112,
    weight: 18.5,
    bmi: 14.7,
    category: 'normal' as const,
    healthStatus: '✅ Good',
    lastUpdated: new Date().toLocaleDateString(),
    acceptanceRate: 85,
    nutritionScore: 78,
    riskLevel: 'low',
  });
  
  const riskColors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
  };
  
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
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center justify-between"
        >
          {onBack && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={onBack}
              className="rounded-lg p-2 transition-all"
              style={{
                background: `${THEME.colors.gray[200]}`,
                color: THEME.colors.gray[700],
              }}
            >
              ← Back
            </motion.button>
          )}
          <div>
            <h1
              className="text-4xl font-bold"
              style={{ color: THEME.colors.primary[500] }}
            >
              {child.name}'s Health Profile
            </h1>
            <p className="mt-2 text-gray-600">
              Last updated: {child.lastUpdated}
            </p>
          </div>
        </motion.div>
        
        {/* Hero Info Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <GlassmorphicCard>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Name & Age */}
              <div>
                <p className="text-sm font-medium text-gray-600">{t('child.name')}</p>
                <h2 className="mt-2 text-2xl font-bold" style={{ color: THEME.colors.gray[900] }}>
                  {child.name}
                </h2>
              </div>
              
              {/* Age */}
              <div>
                <p className="text-sm font-medium text-gray-600">{t('child.age')}</p>
                <p className="mt-2 text-2xl font-bold" style={{ color: THEME.colors.gray[900] }}>
                  {child.age} years
                </p>
              </div>
              
              {/* Height */}
              <div>
                <p className="text-sm font-medium text-gray-600">{t('child.height')}</p>
                <p className="mt-2 text-2xl font-bold" style={{ color: THEME.colors.gray[900] }}>
                  {child.height} cm
                </p>
              </div>
              
              {/* Weight */}
              <div>
                <p className="text-sm font-medium text-gray-600">{t('child.weight')}</p>
                <p className="mt-2 text-2xl font-bold" style={{ color: THEME.colors.gray[900] }}>
                  {child.weight} kg
                </p>
              </div>
            </div>
            
            {/* Divider */}
            <div
              className="my-6 border-t"
              style={{ borderColor: THEME.colors.gray[200] }}
            />
            
            {/* BMI Section */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('child.bmi')}</p>
                <p className="mt-2 text-2xl font-bold" style={{ color: THEME.colors.gray[900] }}>
                  BMI: {child.bmi.toFixed(1)}
                </p>
              </div>
              
              <BMIBadge
                category={child.category}
                language={language}
                size="lg"
              />
              
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="mt-2 text-2xl">{child.healthStatus}</p>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>
        
        {/* Analytics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Growth Trend */}
          <motion.div variants={itemVariants}>
            <GlassmorphicCard>
              <h3 className="text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                📈 Growth Trend
              </h3>
              <div className="mt-6" style={{ height: '150px' }}>
                <div className="flex h-full items-end justify-around gap-1">
                  {[35, 45, 60, 70, 85, 92, 95].map((height, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      animate={{ height: `${(height / 100) * 120}px` }}
                      transition={{ delay: idx * 0.1 }}
                      className="w-full rounded-t bg-gradient-to-t"
                      style={{
                        backgroundImage: `linear-gradient(to top, ${THEME.colors.accent[400]}, ${THEME.colors.primary[500]})`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-600">Last 7 weeks ⬆️ Positive Trend</p>
            </GlassmorphicCard>
          </motion.div>
          
          {/* Acceptance Rate */}
          <motion.div variants={itemVariants}>
            <GlassmorphicCard>
              <h3 className="text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                ✅ Acceptance Rate
              </h3>
              <div className="mt-6 flex items-center justify-center">
                <motion.div
                  className="flex h-32 w-32 items-center justify-center rounded-full text-center"
                  style={{
                    background: `conic-gradient(${THEME.colors.accent[400]} ${child.acceptanceRate * 3.6}deg, ${THEME.colors.gray[200]} 0deg)`,
                  }}
                >
                  <div
                    className="flex h-28 w-28 items-center justify-center rounded-full"
                    style={{ background: THEME.gradients.card }}
                  >
                    <span className="text-3xl font-bold" style={{ color: THEME.colors.accent[400] }}>
                      {child.acceptanceRate}%
                    </span>
                  </div>
                </motion.div>
              </div>
              <p className="mt-4 text-center text-xs text-gray-600">Strong acceptance</p>
            </GlassmorphicCard>
          </motion.div>
          
          {/* Nutrition Score */}
          <motion.div variants={itemVariants}>
            <GlassmorphicCard>
              <h3 className="text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                🥗 Nutrition Score
              </h3>
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold" style={{ color: THEME.colors.primary[500] }}>
                    {child.nutritionScore}
                  </span>
                  <span className="text-gray-600">/100</span>
                </div>
                
                <div className="mt-4 h-2 rounded-full bg-gray-200">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${child.nutritionScore}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${THEME.colors.accent[400]}, ${THEME.colors.primary[500]})`,
                    }}
                  />
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-600">Good nutritional intake</p>
            </GlassmorphicCard>
          </motion.div>
        </motion.div>
        
        {/* AI Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <GlassmorphicCard>
            <div className="flex items-start gap-4">
              <span className="text-4xl">🤖</span>
              <div>
                <h3 className="text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                  AI Recommendation
                </h3>
                <p className="mt-2 text-gray-700" style={{ color: THEME.colors.gray[700] }}>
                  {child.category === 'normal'
                    ? 'Maintain current balanced diet with focus on iron-rich meals for anemia prevention.'
                    : 'Increase protein-rich meals and energy-dense foods. Monitor growth monthly.'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mt-4 rounded-lg px-4 py-2 font-semibold text-white transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${THEME.colors.primary[500]}, ${THEME.colors.accent[400]})`,
                  }}
                >
                  View Recommended Meals →
                </motion.button>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </div>
    </section>
  );
};

export default ChildHealthProfile;
