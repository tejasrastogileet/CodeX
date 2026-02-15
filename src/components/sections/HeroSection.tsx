import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { THEME } from '@/constants/theme';

interface HeroSectionProps {
  onAddChild?: () => void;
  onViewDashboard?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAddChild,
  onViewDashboard,
}) => {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };
  
  // Floating shapes animation
  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
      },
    },
  };
  
  return (
    <section
      className="relative min-h-screen overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
      style={{
        background: THEME.gradients.backgroundSoft,
      }}
    >
      {/* Floating Background Shapes */}
      <motion.div
        className="absolute right-10 top-20 h-64 w-64 rounded-full opacity-20"
        style={{
          background: `linear-gradient(135deg, ${THEME.colors.primary[500]}, ${THEME.colors.accent[400]})`,
        }}
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="absolute bottom-10 left-10 h-48 w-48 rounded-full opacity-15"
        style={{
          background: `linear-gradient(135deg, ${THEME.colors.secondary[300]}, ${THEME.colors.accent[400]})`,
        }}
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 1 }}
      />
      
      {/* Content */}
      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span
            className="inline-block rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              background: `${THEME.colors.accent[400]}20`,
              color: THEME.colors.accent[400],
              border: `1px solid ${THEME.colors.accent[400]}`,
            }}
          >
            🇮🇳 Government-Grade Platform
          </span>
        </motion.div>
        
        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          style={{
            color: THEME.colors.primary[500],
            fontFamily: THEME.typography.heading.fontFamily,
          }}
        >
          {t('hero.mainHeading')}
        </motion.h1>
        
        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg text-gray-600 sm:text-xl"
        >
          {t('hero.subheading')}
        </motion.p>
        
        {/* Stats Preview */}
        <motion.div
          variants={itemVariants}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {[
            { label: 'Children Supported', value: '10,000+' },
            { label: 'Meals Recommended', value: '50,000+' },
            { label: 'Health Improved', value: '85%' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="rounded-2xl p-4"
              style={{
                background: THEME.gradients.card,
                border: `1px solid ${THEME.colors.gray[200]}`,
              }}
            >
              <p className="text-2xl font-bold" style={{ color: THEME.colors.primary[500] }}>
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddChild}
            className="rounded-xl px-8 py-4 font-bold text-white transition-all hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${THEME.colors.primary[500]}, ${THEME.colors.accent[400]})`,
              boxShadow: `0 10px 30px ${THEME.colors.primary[500]}40`,
            }}
          >
            {t('hero.cta1')} →
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewDashboard}
            className="rounded-xl px-8 py-4 font-bold transition-all hover:shadow-lg"
            style={{
              color: THEME.colors.primary[500],
              border: `2px solid ${THEME.colors.primary[500]}`,
              background: 'transparent',
            }}
          >
            {t('hero.cta2')} →
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
