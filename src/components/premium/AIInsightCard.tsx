import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/constants/theme';

interface AIInsightCardProps {
  title: string;
  message: string;
  riskLevel: 'low' | 'medium' | 'high';
  count?: number;
  actionLabel?: string;
  onAction?: () => void;
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'low':
      return { bg: 'bg-green-50', text: 'text-green-700', badge: '#10B981' };
    case 'medium':
      return { bg: 'bg-yellow-50', text: 'text-yellow-700', badge: '#F59E0B' };
    case 'high':
      return { bg: 'bg-red-50', text: 'text-red-700', badge: '#EF4444' };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-700', badge: '#6B7280' };
  }
};

/**
 * AI Insight Alert Card
 * Premium component for AI-generated insights
 */
export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title,
  message,
  riskLevel,
  count,
  actionLabel = 'View Details',
  onAction,
}) => {
  const { bg, text, badge } = getRiskColor(riskLevel);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${bg} ${text} rounded-2xl border-2 p-6`}
      style={{
        borderColor: badge,
        boxShadow: `0 0 20px ${badge}20`,
      }}
    >
      <div className="flex items-start gap-4">
        {/* AI Icon */}
        <div className="mt-1">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl"
          >
            🤖
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{title}</h3>
            {count && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex h-6 w-6 items-center justify-center rounded-full font-bold text-white"
                style={{ backgroundColor: badge }}
              >
                {count}
              </motion.span>
            )}
          </div>
          
          <p className="mt-2 text-sm opacity-90">{message}</p>
          
          {onAction && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAction}
              className="mt-4 rounded-lg px-4 py-2 font-semibold transition-all"
              style={{
                backgroundColor: badge,
                color: '#fff',
              }}
            >
              {actionLabel} →
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AIInsightCard;
