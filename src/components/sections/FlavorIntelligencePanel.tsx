import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { THEME } from '@/constants/theme';
import GlassmorphicCard from '@/components/premium/GlassmorphicCard';

interface FlavorPairing {
  id: string;
  ingredient1: string;
  ingredient2: string;
  compatibility: 'good' | 'moderate' | 'poor';
  score: number;
  suggestion: string;
  confidenceLevel: number;
}

const mockPairings: FlavorPairing[] = [
  {
    id: '1',
    ingredient1: 'Spinach',
    ingredient2: 'Lemon',
    compatibility: 'good',
    score: 92,
    suggestion: 'Adds bright acidity that enhances iron absorption',
    confidenceLevel: 95,
  },
  {
    id: '2',
    ingredient1: 'Rice',
    ingredient2: 'Turmeric',
    compatibility: 'good',
    score: 88,
    suggestion: 'Traditional pairing with anti-inflammatory benefits',
    confidenceLevel: 92,
  },
  {
    id: '3',
    ingredient1: 'Dal',
    ingredient2: 'Ginger',
    compatibility: 'good',
    score: 85,
    suggestion: 'Aids digestion and improves nutrient absorption',
    confidenceLevel: 88,
  },
  {
    id: '4',
    ingredient1: 'Milk',
    ingredient2: 'Turmeric',
    compatibility: 'moderate',
    score: 75,
    suggestion: 'Good for calcium absorption but can reduce curcumin benefits',
    confidenceLevel: 78,
  },
];

/**
 * Flavor Intelligence Panel
 * AI-powered ingredient pairing and taste recommendations
 */
export const FlavorIntelligencePanel: React.FC = () => {
  const { t } = useLanguage();
  
  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case 'good':
        return THEME.colors.accent[400];
      case 'moderate':
        return THEME.colors.warning;
      case 'poor':
        return THEME.colors.danger;
      default:
        return THEME.colors.gray[400];
    }
  };
  
  const getCompatibilityLabel = (compatibility: string) => {
    switch (compatibility) {
      case 'good':
        return '✅ Good Pairing';
      case 'moderate':
        return '⚠️ Moderate';
      case 'poor':
        return '❌ Poor Pairing';
      default:
        return 'Unknown';
    }
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
            {t('flavor.title')}
          </h1>
          <p className="mt-2 text-gray-600">
            AI-powered ingredient pairing and taste enhancement recommendations
          </p>
        </motion.div>
        
        {/* Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 rounded-2xl p-6"
          style={{
            background: `linear-gradient(135deg, ${THEME.colors.primary[500]}15, ${THEME.colors.accent[400]}15)`,
            border: `1px solid ${THEME.colors.primary[500]}30`,
          }}
        >
          <div className="flex gap-4">
            <span className="text-4xl">🤖</span>
            <div>
              <h2 className="font-bold text-lg" style={{ color: THEME.colors.primary[500] }}>
                Smart Flavor Pairing
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Our AI analyzes ingredient compatibility to enhance meal acceptance. Discover pairings that not only taste better but improve nutrition absorption.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Flavor Pairings Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
        >
          {mockPairings.map((pairing) => {
            const color = getCompatibilityColor(pairing.compatibility);
            
            return (
              <motion.div key={pairing.id} variants={itemVariants}>
                <GlassmorphicCard hover>
                  {/* Header with Compatibility */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex gap-2">
                        <span className="text-2xl">🧂</span>
                        <div>
                          <p className="font-bold" style={{ color: THEME.colors.gray[900] }}>
                            {pairing.ingredient1} + {pairing.ingredient2}
                          </p>
                          <p className="text-xs text-gray-600">Ingredient Pairing</p>
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {getCompatibilityLabel(pairing.compatibility)}
                    </div>
                  </div>
                  
                  {/* Compatibility Score */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span>{t('flavor.compatibility')}</span>
                      <span style={{ color }}>{pairing.score}/100</span>
                    </div>
                    <div
                      className="h-3 rounded-full"
                      style={{ background: `${color}20` }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pairing.score}%` }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </div>
                  
                  {/* Suggestion */}
                  <div
                    className="mt-4 rounded-lg p-3"
                    style={{ background: `${color}10` }}
                  >
                    <p className="text-xs font-medium text-gray-600">Enhancement Suggestion</p>
                    <p className="mt-2 text-sm" style={{ color: THEME.colors.gray[900] }}>
                      {pairing.suggestion}
                    </p>
                  </div>
                  
                  {/* Confidence Level */}
                  <div
                    className="mt-4 border-t pt-4"
                    style={{ borderColor: THEME.colors.gray[200] }}
                  >
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-gray-600">Confidence Level</span>
                      <span style={{ color: THEME.colors.accent[400] }}>
                        {pairing.confidenceLevel}%
                      </span>
                    </div>
                    <div
                      className="mt-2 h-2 rounded-full"
                      style={{ background: `${THEME.colors.accent[400]}20` }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pairing.confidenceLevel}%` }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: THEME.colors.accent[400] }}
                      />
                    </div>
                  </div>
                  
                  {/* Use in Meal Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full rounded-lg py-2 font-semibold text-white transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                    }}
                  >
                    Use in Meal →
                  </motion.button>
                </GlassmorphicCard>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Featured Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="mb-6 text-2xl font-bold" style={{ color: THEME.colors.gray[900] }}>
            💡 Flavor Enhancement Tips
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: '🌶️',
                title: 'Spice Combinations',
                description: 'Traditional spice blends improve taste perception and aid digestion',
              },
              {
                icon: '🍋',
                title: 'Acid Balance',
                description: 'Lemon juice enhances iron absorption and brightens flavors',
              },
              {
                icon: '🧈',
                title: 'Fat Solubility',
                description: 'Ghee and oil help absorb fat-soluble vitamins A, D, E, K',
              },
            ].map((tip, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="rounded-xl p-4"
                style={{
                  background: THEME.gradients.card,
                  border: `1px solid ${THEME.colors.gray[200]}`,
                }}
              >
                <span className="text-3xl">{tip.icon}</span>
                <h3 className="mt-3 font-bold" style={{ color: THEME.colors.gray[900] }}>
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlavorIntelligencePanel;
