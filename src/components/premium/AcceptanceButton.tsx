import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/constants/theme';

interface AcceptanceButtonProps {
  type: 'fully-eaten' | 'partially-eaten' | 'mostly-wasted';
  onClick: () => void;
  selected?: boolean;
  loading?: boolean;
}

const buttonConfig = {
  'fully-eaten': {
    icon: '✅',
    label: 'Fully Eaten',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-500',
  },
  'partially-eaten': {
    icon: '⚠️',
    label: 'Partially Eaten',
    color: '#F59E0B',
    gradient: 'from-yellow-500 to-orange-500',
  },
  'mostly-wasted': {
    icon: '❌',
    label: 'Mostly Wasted',
    color: '#EF4444',
    gradient: 'from-red-500 to-rose-500',
  },
};

/**
 * One-tap Acceptance Logging Button
 * Ultra-simple interface for food acceptance tracking
 */
export const AcceptanceButton: React.FC<AcceptanceButtonProps> = ({
  type,
  onClick,
  selected = false,
  loading = false,
}) => {
  const config = buttonConfig[type];
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={loading}
      className={`relative flex h-24 w-24 flex-col items-center justify-center rounded-2xl font-bold transition-all duration-300 md:h-32 md:w-32 ${
        selected
          ? 'ring-4 ring-offset-2'
          : 'opacity-70 hover:opacity-100'
      }`}
      style={{
        background: selected
          ? `linear-gradient(135deg, ${config.color}, ${config.color}dd)`
          : `linear-gradient(135deg, ${config.color}40, ${config.color}20)`,
        color: config.color,
        ringColor: config.color,
      }}
    >
      {loading && (
        <div className="absolute inset-0 rounded-2xl bg-white opacity-50" />
      )}
      
      <motion.div
        animate={selected ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl"
      >
        {config.icon}
      </motion.div>
      
      <span className="mt-2 text-xs font-semibold md:text-sm">
        {config.label}
      </span>
    </motion.button>
  );
};

export default AcceptanceButton;
