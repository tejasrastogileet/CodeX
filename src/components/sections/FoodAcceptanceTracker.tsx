import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { THEME } from '@/constants/theme';
import GlassmorphicCard from '@/components/premium/GlassmorphicCard';
import AcceptanceButton from '@/components/premium/AcceptanceButton';

interface FoodAcceptanceTrackerProps {
  childName?: string;
  mealName?: string;
}

/**
 * Food Acceptance Tracker - One-tap Logging System
 * Ultra-simple interface for meal acceptance logging
 */
export const FoodAcceptanceTracker: React.FC<FoodAcceptanceTrackerProps> = ({
  childName = 'Aisha Sharma',
  mealName = 'Khichdi with Vegetables',
}) => {
  const { t } = useLanguage();
  const [selectedAcceptance, setSelectedAcceptance] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [selectedChild, setSelectedChild] = React.useState<string>(childName);
  const [selectedMealType, setSelectedMealType] = React.useState<string>('Breakfast');
  const [selectedRecipe, setSelectedRecipe] = React.useState<string>(mealName);

  // Mock recent logs - kept frontend only
  const [recentLogs, setRecentLogs] = React.useState(() => [
    { id: 'l1', child: 'Aisha Sharma', meal: 'Khichdi', status: 'Fully Eaten', time: '2026-02-14 09:12' },
    { id: 'l2', child: 'Rahul Kumar', meal: 'Dalia', status: 'Partially Eaten', time: '2026-02-14 09:05' },
    { id: 'l3', child: 'Meera Devi', meal: 'Sambar Rice', status: 'Wasted', time: '2026-02-13 12:30' },
  ]);
  
  const handleSubmit = async () => {
    if (!selectedAcceptance) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setSelectedAcceptance(null);
      setSubmitted(false);
    }, 2000);
  };
  
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };
  
  return (
    <section style={{ background: 'linear-gradient(135deg, #e6f7f5, #f4f9ff)' }} className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{ color: THEME.colors.primary[500] }}
          >
            {t('acceptance.logMeal')}
          </h1>
          <p className="mt-2 text-gray-600">
            Track how much food was eaten - helps us improve nutrition
          </p>
        </motion.div>
        
        {/* Log Meal Acceptance Card */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-8">
          <div className="bg-white rounded-xl p-8 shadow-lg" style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left column: dropdowns */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold">{t('child.name') || 'Child'}</Label>
                  <select value={selectedChild} onChange={(e) => setSelectedChild(e.target.value)} className="mt-2 w-full h-11 rounded-lg border border-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all">
                    <option>{childName}</option>
                    {/* keep existing binding - not changing field IDs */}
                    <option>Rahul Kumar</option>
                    <option>Meera Devi</option>
                  </select>
                </div>

                <div>
                  <Label className="text-sm font-semibold">Meal Type</Label>
                  <select value={selectedMealType} onChange={(e) => setSelectedMealType(e.target.value)} className="mt-2 w-full h-11 rounded-lg border border-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all">
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Snack</option>
                  </select>
                </div>

                <div>
                  <Label className="text-sm font-semibold">Recipe</Label>
                  <select value={selectedRecipe} onChange={(e) => setSelectedRecipe(e.target.value)} className="mt-2 w-full h-11 rounded-lg border border-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all">
                    <option>{mealName}</option>
                    <option>Khichdi</option>
                    <option>Dalia</option>
                    <option>Sambar Rice</option>
                  </select>
                </div>
              </div>

              {/* Right column: meal info and status cards */}
              <div>
                <div className="mb-4">
                  <p className="text-sm text-slate-600">Selected Child</p>
                  <p className="text-lg font-bold text-slate-900">{selectedChild}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[{
                    key: 'fully-eaten', label: 'Fully Eaten', color: '#e6ffed', border: '#10B981', icon: '✅'
                  },{
                    key: 'partially-eaten', label: 'Partial', color: '#fff7ed', border: '#f59e0b', icon: '⚠️'
                  },{
                    key: 'mostly-wasted', label: 'Wasted', color: '#fff1f2', border: '#ef4444', icon: '❌'
                  }].map(item => (
                    <div key={item.key} onClick={() => setSelectedAcceptance(item.key)} role="button" tabIndex={0}
                      className={`rounded-[14px] p-4 text-center cursor-pointer transition-all duration-300`} 
                      style={{ background: item.color, border: `1px solid ${item.border}`, transform: selectedAcceptance === item.key ? 'translateY(-6px)' : 'none' }}>
                      <div className="text-2xl">{item.icon}</div>
                      <p className="mt-2 font-semibold">{item.label}</p>
                    </div>
                  ))}
                </div>

                {selectedAcceptance && (
                  <div className="mt-6 text-center">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={async () => {
                      setLoading(true);
                      await new Promise(resolve => setTimeout(resolve, 800));
                      setLoading(false);
                      setSubmitted(true);
                      // push to recent logs (frontend only)
                      setRecentLogs(r => [{ id: String(Date.now()), child: selectedChild, meal: selectedRecipe, status: selectedAcceptance === 'fully-eaten' ? 'Fully Eaten' : selectedAcceptance === 'partially-eaten' ? 'Partially Eaten' : 'Wasted', time: new Date().toISOString().slice(0,16).replace('T',' ') }, ...r]);
                      setTimeout(() => { setSelectedAcceptance(null); setSubmitted(false); }, 2000);
                    }} disabled={loading} className="mt-2 rounded-xl px-8 py-3 font-bold text-white" style={{ background: `linear-gradient(135deg, ${THEME.colors.accent[400]}, ${THEME.colors.primary[500]})` }}>
                      {loading ? 'Saving...' : 'Confirm & Save'}
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Acceptance Buttons */}
        {!submitted ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-12 text-center"
          >
            <p className="mb-8 text-lg font-semibold text-gray-700">
              How much was eaten?
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <AcceptanceButton
                type="fully-eaten"
                onClick={() => setSelectedAcceptance('fully-eaten')}
                selected={selectedAcceptance === 'fully-eaten'}
                loading={loading && selectedAcceptance === 'fully-eaten'}
              />
              
              <AcceptanceButton
                type="partially-eaten"
                onClick={() => setSelectedAcceptance('partially-eaten')}
                selected={selectedAcceptance === 'partially-eaten'}
                loading={loading && selectedAcceptance === 'partially-eaten'}
              />
              
              <AcceptanceButton
                type="mostly-wasted"
                onClick={() => setSelectedAcceptance('mostly-wasted')}
                selected={selectedAcceptance === 'mostly-wasted'}
                loading={loading && selectedAcceptance === 'mostly-wasted'}
              />
            </div>
            
            {/* Submit Button */}
            {selectedAcceptance && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={loading}
                  className="rounded-xl px-12 py-4 font-bold text-white transition-all hover:shadow-lg disabled:opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${THEME.colors.accent[400]}, ${THEME.colors.primary[500]})`,
                  }}
                >
                  {loading ? 'Saving...' : 'Confirm & Save'}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 text-center"
          >
            <div className="inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="mb-4 text-6xl"
              >
                ✅
              </motion.div>
              <p
                className="text-2xl font-bold"
                style={{ color: THEME.colors.accent[400] }}
              >
                Logged Successfully!
              </p>
              <p className="mt-2 text-gray-600">
                Great job tracking your nutrition data
              </p>
            </div>
          </motion.div>
        )}
        
        {/* Recent Logs Section */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md" style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.04)' }}>
            <h3 className="text-lg font-bold mb-4">Recent Logs</h3>
            <div className="space-y-3">
              {recentLogs.map(log => (
                <div key={log.id} className="flex items-center justify-between rounded-lg p-3 bg-white border-l-4 hover:shadow-md transition-shadow" style={{ borderLeftColor: log.status === 'Fully Eaten' ? '#10B981' : log.status === 'Partially Eaten' ? '#f59e0b' : '#ef4444' }}>
                  <div>
                    <p className="font-semibold">{log.child} • <span className="text-sm text-muted-foreground">{log.meal}</span></p>
                    <p className="text-xs text-muted-foreground">{log.time}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold" style={{ background: log.status === 'Fully Eaten' ? '#e6ffed' : log.status === 'Partially Eaten' ? '#fff7ed' : '#fff1f2' }}>{log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FoodAcceptanceTracker;
