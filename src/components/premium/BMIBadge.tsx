import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME, BMI_COLORS, BMI_LABELS } from '@/constants/theme';
import { Language } from '@/constants/translations';

interface BMIBadgeProps {
  category: 'severely-underweight' | 'underweight' | 'normal' | 'overweight';
  language: Language;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Color-coded BMI Status Badge
 */
export const BMIBadge: React.FC<BMIBadgeProps> = ({
  category,
  language,
  size = 'md',
}) => {
  const color = BMI_COLORS[category];
  const label = BMI_LABELS[language][category];
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };
  
  const iconMap = {
    'severely-underweight': '🔴',
    'underweight': '🟡',
    'normal': '🟢',
    'overweight': '🟠',
  };
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={`inline-flex items-center gap-2 rounded-full font-semibold text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: color }}
    >
      <span>{iconMap[category]}</span>
      {label}
    </motion.div>
  );
};

export default BMIBadge;
