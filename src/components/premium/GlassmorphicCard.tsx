import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/constants/theme';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

/**
 * Glassmorphic Card - Modern SaaS card with blur effect
 */
export const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className = '',
  hover = true,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      onClick={onClick}
      className={`rounded-2xl p-6 backdrop-blur-md cursor-pointer ${className}`}
      style={{
        background: THEME.gradients.card,
        boxShadow: THEME.shadows.md,
        border: '1px solid rgba(11, 60, 93, 0.1)',
      }}
    >
      {children}
    </motion.div>
  );
};

export default GlassmorphicCard;
