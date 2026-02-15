/**
 * Showcase / Demo Page
 * Path: http://localhost:5173/showcase
 * 
 * This page demonstrates all premium components in action
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/constants/theme';
import {
  StatCard,
  BMIBadge,
  GlassmorphicCard,
  AIInsightCard,
  AcceptanceButton,
} from '@/components';
import { useLanguage } from '@/hooks/useLanguage';

export default function ComponentShowcase() {
  const { language, t } = useLanguage();
  const [selectedAcceptance, setSelectedAcceptance] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1
            className="text-5xl font-bold"
            style={{ color: THEME.colors.primary[500] }}
          >
            🎨 Component Showcase
          </h1>
          <p className="mt-2 text-xl text-gray-600">
            All premium AaharMitra components in one place
          </p>
        </motion.div>
        
        {/* Stat Cards Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="mb-6 text-3xl font-bold" style={{ color: THEME.colors.gray[900] }}>
            📊 Stat Cards
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard
              label="Children"
              value={1248}
              icon={<span>👶</span>}
              trend={12}
              badge={{ label: '↑ This Month', color: '#10B981' }}
            />
            <StatCard
              label="High Risk"
              value={47}
              icon={<span>⚠️</span>}
              trend={-8}
              badge={{ label: 'Attention', color: '#EF4444' }}
            />
            <StatCard
              label="Acceptance"
              value="82.5%"
              icon={<span>✅</span>}
              trend={5}
              badge={{ label: 'Good', color: '#10B981' }}
            />
            <StatCard
              label="Waste"
              value="34%"
              icon={<span>♻️</span>}
              trend={18}
              badge={{ label: 'Improved', color: '#10B981' }}
            />
            <StatCard
              label="Budget"
              value="91/100"
              icon={<span>💰</span>}
              trend={3}
              badge={{ label: 'Excellent', color: '#10B981' }}
            />
          </div>
        </motion.section>
        
        {/* BMI Badges Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mb-6 text-3xl font-bold" style={{ color: THEME.colors.gray[900] }}>
            🏷️ BMI Status Badges
          </h2>
          <div className="flex flex-wrap gap-8">
            <BMIBadge category="severely-underweight" language={language} size="lg" />
            <BMIBadge category="underweight" language={language} size="lg" />
            <BMIBadge category="normal" language={language} size="lg" />
            <BMIBadge category="overweight" language={language} size="lg" />
          </div>
        </motion.section>
        
        {/* Glassmorphic Cards Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-6 text-3xl font-bold" style={{ color: THEME.colors.gray[900] }}>
            ✨ Glassmorphic Cards
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <GlassmorphicCard hover>
              <h3 className="text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                Card 1
              </h3>
              <p className="mt-2 text-gray-600">
                Hover over this card to see the lift effect
              </p>
            </GlassmorphicCard>
            
            <GlassmorphicCard hover>
              <h3 className="text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                Card 2
              </h3>
              <p className="mt-2 text-gray-600">
                Glassmorphic design with blur background
              </p>
            </GlassmorphicCard>
            
            <GlassmorphicCard hover>
              <h3 className="text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                Card 3
              </h3>
              <p className="mt-2 text-gray-600">
                Perfect for modern SaaS UI
              </p>
            </GlassmorphicCard>
          </div>
        </motion.section>
        
        {/* AI Insight Cards Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="mb-6 text-3xl font-bold" style={{ color: THEME.colors.gray[900] }}>
            🤖 AI Insight Cards
          </h2>
          <div className="space-y-4">
            <AIInsightCard
              title="Low Risk"
              message="All children are well-nourished and healthy"
              riskLevel="low"
              count={24}
              actionLabel="View Details"
            />
            
            <AIInsightCard
              title="Medium Risk"
              message="3 children need closer monitoring"
              riskLevel="medium"
              count={3}
              actionLabel="View Details"
            />
            
            <AIInsightCard
              title="High Risk"
              message="2 children show signs of undernutrition"
              riskLevel="high"
              count={2}
              actionLabel="View Details"
            />
          </div>
        </motion.section>
        
        {/* Acceptance Buttons Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-6 text-3xl font-bold" style={{ color: THEME.colors.gray[900] }}>
            ⭐ Acceptance Buttons
          </h2>
          <div className="rounded-2xl p-8" style={{ background: THEME.gradients.backgroundSoft }}>
            <p className="mb-8 text-center text-lg font-semibold text-gray-700">
              Select one:
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-8">
              <AcceptanceButton
                type="fully-eaten"
                onClick={() => setSelectedAcceptance('fully-eaten')}
                selected={selectedAcceptance === 'fully-eaten'}
              />
              
              <AcceptanceButton
                type="partially-eaten"
                onClick={() => setSelectedAcceptance('partially-eaten')}
                selected={selectedAcceptance === 'partially-eaten'}
              />
              
              <AcceptanceButton
                type="mostly-wasted"
                onClick={() => setSelectedAcceptance('mostly-wasted')}
                selected={selectedAcceptance === 'mostly-wasted'}
              />
            </div>
            
            {selectedAcceptance && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center text-lg font-semibold"
                style={{ color: THEME.colors.primary[500] }}
              >
                ✅ Selected: {selectedAcceptance.replace('-', ' ')}
              </motion.p>
            )}
          </div>
        </motion.section>
        
        {/* Theme Colors Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="mb-6 text-3xl font-bold" style={{ color: THEME.colors.gray[900] }}>
            🎨 Theme Colors
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {[
              { label: 'Primary', color: THEME.colors.primary[500] },
              { label: 'Secondary', color: THEME.colors.secondary[300] },
              { label: 'Accent', color: THEME.colors.accent[400] },
              { label: 'Warning', color: THEME.colors.warning },
              { label: 'Danger', color: THEME.colors.danger },
              { label: 'Info', color: THEME.colors.info },
            ].map((item, idx) => (
              <div key={idx}>
                <div
                  className="h-32 rounded-lg shadow-md"
                  style={{ backgroundColor: item.color }}
                />
                <p className="mt-2 font-semibold text-center">{item.label}</p>
                <p className="text-center text-sm text-gray-600">{item.color}</p>
              </div>
            ))}
          </div>
        </motion.section>
        
        {/* Typography */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="mb-6 text-3xl font-bold" style={{ color: THEME.colors.gray[900] }}>
            📝 Typography
          </h2>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Heading 1 (Poppins Bold)</h1>
            <h2 className="text-4xl font-bold">Heading 2 (Poppins Bold)</h2>
            <h3 className="text-3xl font-bold">Heading 3 (Poppins Bold)</h3>
            <p className="text-lg">Body text (Inter Regular)</p>
            <p className="text-base">Smaller body text</p>
            <p className="text-sm text-gray-600">Small secondary text</p>
          </div>
        </motion.section>
        
        {/* Responsive Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="mb-6 text-3xl font-bold" style={{ color: THEME.colors.gray[900] }}>
            📱 Responsive Grid
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="flex h-24 items-center justify-center rounded-lg font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${THEME.colors.primary[500]}, ${THEME.colors.accent[400]})`,
                }}
              >
                Item {item}
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
