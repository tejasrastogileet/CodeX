import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { THEME } from '@/constants/theme';
import GlassmorphicCard from '@/components/premium/GlassmorphicCard';

/**
 * Reports & Export Section
 * Comprehensive reporting and data export
 */
export const ReportsAndExports: React.FC = () => {
  const { t } = useLanguage();
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');
  
  const reports = [
    {
      icon: '📊',
      title: 'Weekly Summary',
      description: 'Nutrition metrics and acceptance rates for this week',
      data: {
        totalMeals: 156,
        avgAcceptance: '84.2%',
        totalChildren: 24,
      },
    },
    {
      icon: '📈',
      title: 'BMI Trends',
      description: 'Growth tracking and BMI category distribution',
      data: {
        improved: 18,
        stable: 5,
        concern: 1,
      },
    },
    {
      icon: '♻️',
      title: 'Waste Reduction',
      description: 'Food waste metrics and efficiency gains',
      data: {
        wasteReduction: '34.2%',
        savingsPerWeek: '₹2,480',
        mealsSaved: 47,
      },
    },
    {
      icon: '⭐',
      title: 'Top Performers',
      description: 'Best meals with highest acceptance rates',
      data: {
        topMeal: 'Khichdi with Vegetables',
        acceptance: '95%',
        preparationsWk: 28,
      },
    },
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
  
  const handleExport = async () => {
    alert(`Exporting data as ${exportFormat.toUpperCase()}...`);
    // Simulate download
    const mockData = 'child_name,age,bmi,acceptance_rate,nutrition_score\\nAisha,6,14.7,85,78\\nRavi,5,13.2,92,88';
    const blob = new Blob([mockData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aaharmitra-report-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
    a.click();
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
            {t('reports.title')}
          </h1>
          <p className="mt-2 text-gray-600">
            Comprehensive insights and export options for your records
          </p>
        </motion.div>
        
        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 rounded-2xl p-6"
          style={{
            background: THEME.gradients.card,
            border: `1px solid ${THEME.colors.gray[200]}`,
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold" style={{ color: THEME.colors.gray[900] }}>
                📥 Export Your Data
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Download all children records, meal logs, and nutrition metrics
              </p>
              
              <div className="mt-4 space-y-2">
                {[
                  { value: 'csv', label: '📄 CSV Format (Excel)' },
                  { value: 'pdf', label: '📕 PDF Report' },
                ].map((format) => (
                  <label key={format.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="export"
                      value={format.value}
                      checked={exportFormat === format.value}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">{format.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                className="rounded-xl px-6 py-4 font-bold text-white transition-all hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${THEME.colors.accent[400]}, ${THEME.colors.primary[500]})`,
                }}
              >
                📥 {t('reports.downloadReport')}
              </motion.button>
              
              <p className="text-xs text-center text-gray-600">
                Last exported: 2 days ago
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Reports Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reports.map((report, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <GlassmorphicCard hover>
                <span className="text-4xl">{report.icon}</span>
                <h3 className="mt-3 font-bold" style={{ color: THEME.colors.gray[900] }}>
                  {report.title}
                </h3>
                <p className="mt-1 text-xs text-gray-600">{report.description}</p>
                
                {/* Data Display */}
                <div
                  className="mt-4 rounded-lg p-3"
                  style={{ background: `${THEME.colors.primary[500]}10` }}
                >
                  <div className="space-y-2 text-sm">
                    {Object.entries(report.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize text-gray-600">
                          {key.replace(/_/g, ' ')}:
                        </span>
                        <span className="font-bold" style={{ color: THEME.colors.primary[500] }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mt-4 w-full rounded-lg py-2 font-semibold transition-all"
                  style={{
                    color: THEME.colors.primary[500],
                    border: `1px solid ${THEME.colors.primary[500]}`,
                  }}
                >
                  View Details →
                </motion.button>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Detailed Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-6 text-2xl font-bold" style={{ color: THEME.colors.gray[900] }}>
            📊 Detailed Analytics
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Children Status Distribution */}
            <GlassmorphicCard hover={false}>
              <h3 className="font-bold" style={{ color: THEME.colors.gray[900] }}>
                Children by BMI Category
              </h3>
              
              <div className="mt-6 space-y-3">
                {[
                  { label: 'Normal', value: 18, color: THEME.colors.accent[400] },
                  { label: 'Underweight', value: 4, color: THEME.colors.warning },
                  { label: 'Overweight', value: 2, color: THEME.colors.danger },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                    <div
                      className="mt-2 h-3 rounded-full"
                      style={{ background: `${item.color}20` }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / 24) * 100}%` }}
                        transition={{ delay: idx * 0.2, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassmorphicCard>
            
            {/* Budget Summary */}
            <GlassmorphicCard hover={false}>
              <h3 className="font-bold" style={{ color: THEME.colors.gray[900] }}>
                Weekly Budget Summary
              </h3>
              
              <div className="mt-6 space-y-4">
                {[
                  { label: 'Total Budget', value: '₹2,450', status: 'Allocated' },
                  { label: 'Spent', value: '₹2,280', status: 'Under Budget ✅' },
                  { label: 'Remaining', value: '₹170', status: 'Available' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.status}</p>
                    </div>
                    <p
                      className="text-lg font-bold"
                      style={{ color: THEME.colors.primary[500] }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </GlassmorphicCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReportsAndExports;
