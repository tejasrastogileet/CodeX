import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '@/constants/theme';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
  badge?: {
    label: string;
    color: string;
  };
  sparkline?: number[];
  loading?: boolean;
}

/**
 * Animated Stat Card Component
 * Used in Dashboard for KPI metrics
 */
export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  trend,
  badge,
  sparkline,
  loading = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-[16px] p-6 backdrop-blur-md"
      style={{
        background: THEME.gradients.card,
        boxShadow: THEME.shadows.lg,
        border: '1px solid rgba(11, 60, 93, 0.1)',
      }}
    >
      {/* Gradient background orb */}
      <div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10"
        style={{
          background: `linear-gradient(135deg, #0B3C5D 0%, #10B981 100%)`,
        }}
      />
      
      {/* Icon */}
      <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-teal-50">
        {icon}
      </div>
      
      {/* Content */}
      <div className="relative">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        
        {loading ? (
          <div className="mt-2 h-8 w-16 animate-pulse rounded bg-gray-200" />
        ) : (
          <div className="mt-2 flex items-baseline gap-2">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-gray-900"
            >
              {value}
            </motion.h3>
            
            {trend !== undefined && (
              <span
                className={`text-sm font-semibold ${
                  trend > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
            )}
          </div>
        )}
        
        {/* Badge */}
        {badge && (
          <div
            className="mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: badge.color }}
          >
            {badge.label}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
