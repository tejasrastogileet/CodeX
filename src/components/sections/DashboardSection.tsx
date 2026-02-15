import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { THEME } from '@/constants/theme';
import StatCard from '@/components/premium/StatCard';

interface DashboardProps {
  children?: React.ReactNode;
}

/**
 * Government-Grade Dashboard - Delhi Public Health Platform
 * Official, trustworthy design for Anganwadi monitoring
 */
export const DashboardSection: React.FC<DashboardProps> = () => {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState({
    totalChildren: 0,
    highRisk: 0,
    avgAcceptance: 0,
    wasteReduction: 0,
    budgetScore: 0,
  });
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [reportStatus, setReportStatus] = useState<'pending' | 'sent' | null>(null);
  const [selectedZone, setSelectedZone] = useState('Govindpuri');

  // Station-wise risk data
  const stationRiskData: { [key: string]: number } = {
    'Rajiv Chowk': 58,
    'Kashmere Gate': 67,
    'Central Secretariat': 32,
    'Hauz Khas': 23,
    'Lajpat Nagar': 49,
    'Govindpuri': 47,
    'Nehru Place': 38,
    'Kalkaji Mandir': 29,
    'Mandi House': 54,
    'Dwarka Sector 21': 41,
  };

  const zones = Object.keys(stationRiskData);
  
  // Simulate loading and animation of counters
  useEffect(() => {
    const loadStats = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const highRiskCount = stationRiskData[selectedZone];
      setStats({
        totalChildren: 1248,
        highRisk: highRiskCount,
        avgAcceptance: 82.5,
        wasteReduction: 34,
        budgetScore: 91,
      });
    };
    loadStats();
  }, [selectedZone, stationRiskData]);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file.name);
    } else {
      alert('Please upload a PDF file only.');
    }
  };

  // Handle report submission
  const handleSendReport = () => {
    if (!uploadedFile || !emailInput) {
      alert('Please upload a PDF file and enter an email address.');
      return;
    }
    setReportStatus('sent');
    setTimeout(() => {
      setReportStatus('sent');
    }, 500);
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

  const impactMetrics = [
    {
      value: '82.5%',
      label: language === 'en' ? 'Average Meal Acceptance' : 'औसत भोजन स्वीकृति',
      icon: '✅',
    },
    {
      value: '34%',
      label: language === 'en' ? 'Food Waste Reduction' : 'खाद्य अपशिष्ट में कमी',
      icon: '♻️',
    },
    {
      value: '10-15%',
      label: language === 'en' ? 'Cost Optimization' : 'लागत अनुकूलन',
      icon: '💰',
    },
    {
      value: '✔',
      label: language === 'en' ? 'Early Malnutrition Detection Enabled' : 'प्रारंभिक कुपोषण पहचान सक्षम',
      icon: '🔍',
    },
  ];
  
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Government Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b-4 border-yellow-400 bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-4 text-center text-white shadow-lg sm:px-6 lg:px-8"
      >
        <p className="text-sm font-semibold tracking-wide md:text-base">
          {t('government.banner')}
        </p>
        <p className="mt-1 text-xs font-medium text-blue-100 md:text-sm">
          {t('government.bannerHindi')}
        </p>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-14 border-b-2 border-slate-200 pb-8"
        >
          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
            {t('government.dashboardTitle')}
          </h1>
          <p className="mt-4 text-lg font-medium text-slate-600 md:text-xl">
            {language === 'en' ? 'आहारमित्र पोषण विश्लेषण डैशबोर्ड' : t('government.dashboardTitle')}
          </p>
          <p className="mt-3 text-base text-slate-600 md:text-lg">
            {t('government.dashboardSubtitle')}
          </p>
          {language === 'hi' && (
            <p className="mt-2 text-base text-slate-600 md:text-lg">
              {t('government.dashboardSubtitle')}
            </p>
          )}
        </motion.div>

        {/* Top Stats - KPI Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          <StatCard
            label={t('dashboard.stats.totalChildren')}
            value={stats.totalChildren}
            trend={12}
            badge={{ label: '↑ This Month', color: '#10B981' }}
            icon={<span className="text-3xl">👶</span>}
            loading={stats.totalChildren === 0}
          />
          
          <StatCard
            label={t('dashboard.stats.highRisk')}
            value={stats.highRisk}
            trend={-8}
            badge={{ label: 'Needs Attention', color: '#EF4444' }}
            icon={<span className="text-3xl">⚠️</span>}
            loading={stats.highRisk === 0}
          />
          
          <StatCard
            label={t('dashboard.stats.avgAcceptance')}
            value={`${stats.avgAcceptance}%`}
            trend={5}
            badge={{ label: 'Good Status', color: '#10B981' }}
            icon={<span className="text-3xl">✅</span>}
            loading={stats.avgAcceptance === 0}
          />
          
          <StatCard
            label={t('dashboard.stats.wasteReduction')}
            value={`${stats.wasteReduction}%`}
            trend={18}
            badge={{ label: 'Improved', color: '#10B981' }}
            icon={<span className="text-3xl">♻️</span>}
            loading={stats.wasteReduction === 0}
          />
          
          <StatCard
            label={t('dashboard.stats.budgetEfficiency')}
            value={`${stats.budgetScore}/100`}
            trend={3}
            badge={{ label: 'Excellent', color: '#10B981' }}
            icon={<span className="text-3xl">💰</span>}
            loading={stats.budgetScore === 0}
          />
        </motion.div>

        {/* Current Weekly Update Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="rounded-xl border-l-4 border-l-red-600 border border-red-200 bg-white p-8 shadow-lg md:p-10">
          <div className="mb-8">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex-1">
                <label className="mb-3 block text-sm font-bold text-slate-700 md:text-base">
                  {language === 'en' ? 'Select Zone' : 'क्षेत्र चुनें'}
                </label>
                <motion.select
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 font-semibold text-slate-900 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-200 md:text-lg"
                >
                  {zones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </motion.select>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
              {language === 'en' ? `Current Weekly Update – ${selectedZone} Zone` : `${selectedZone} क्षेत्र – साप्ताहिक पोषण स्थिति अपडेट`}
            </h2>
            <p className="mt-3 text-base text-slate-700 md:text-lg">
              {language === 'en' ? "Monitoring summary for this week's Anganwadi nutrition data." : 'इस सप्ताह की आंगनवाड़ी पोषण रिपोर्ट का सारांश।'}
            </p>
          </div>

            {/* Risk Summary with badge and button */}
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                {/* Status Badge */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mb-4 inline-block rounded-full bg-red-100 px-4 py-2"
                >
                  <span className="text-sm font-bold text-red-700 md:text-base">
                    {language === 'en' ? '🔴 Needs Immediate Review' : '🔴 तत्काल समीक्षा आवश्यक'}
                  </span>
                </motion.div>

                {/* Risk Message */}
                <p className="mt-4 text-lg font-semibold text-slate-900 md:text-xl">
                  {stats.highRisk} {language === 'en' ? 'children show early signs of undernutrition and require dietary intervention.' : 'बच्चों में कुपोषण के प्रारंभिक संकेत पाए गए हैं। आहार हस्तक्षेप आवश्यक है।'}
                </p>
              </div>

              {/* Generate Report Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 font-bold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 md:px-10 md:py-5 md:text-lg"
              >
                {language === 'en' ? 'Generate Full Report' : 'पूर्ण रिपोर्ट जनरेट करें'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Anganwadi Reporting Action Required Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-8 shadow-lg md:p-10">
            {/* Section Title */}
            <div className="mb-8 border-b-2 border-amber-300 pb-6">
              <h3 className="text-2xl font-bold text-amber-900 md:text-3xl lg:text-4xl">
                {language === 'en' ? 'Anganwadi Reporting – Action Required' : 'आंगनवाड़ी रिपोर्टिंग – आवश्यक कार्यवाही'}
              </h3>
              <p className="mt-4 text-base font-medium text-amber-800 md:text-lg">
                {language === 'en' ? 'All Anganwadi workers must upload the complete nutrition report and send it to the department via email.' : 'सभी आंगनवाड़ी कार्यकर्ताओं को पूर्ण पोषण रिपोर्ट अपलोड कर विभाग को ईमेल के माध्यम से भेजना अनिवार्य है।'}
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left Column - File Upload */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900 md:text-xl">
                  {language === 'en' ? '📄 Upload Nutrition Report' : '📄 पोषण रिपोर्ट अपलोड करें'}
                </h4>
                
                {/* File Upload Button */}
                <label className="block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-lg border-2 border-dashed border-amber-400 bg-white px-6 py-4 font-bold text-amber-700 transition-all hover:bg-amber-50 md:px-8 md:py-5"
                    onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                  >
                    {language === 'en' ? '📁 Choose PDF File' : '📁 पीडीएफ फाइल चुनें'}
                  </motion.button>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Uploaded File Display */}
                {uploadedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 rounded-lg bg-green-50 p-4"
                  >
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-sm font-semibold text-green-900">{language === 'en' ? 'File Uploaded' : 'फाइल अपलोड की गई'}</p>
                      <p className="truncate text-xs text-green-800">{uploadedFile}</p>
                    </div>
                  </motion.div>
                )}

                {!uploadedFile && (
                  <p className="text-sm text-slate-600">{language === 'en' ? 'PDF files only. Max 10MB.' : 'केवल पीडीएफ फाइलें। अधिकतम 10 एमबी।'}</p>
                )}
              </div>

              {/* Right Column - Email Submission */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900 md:text-xl">
                  {language === 'en' ? '📧 Send Report' : '📧 रिपोर्ट भेजें'}
                </h4>

                {/* Email Input */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {language === 'en' ? 'Recipient Email' : 'प्राप्तकर्ता ईमेल'}
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder={language === 'en' ? 'nutrition-dept@delhi.gov.in' : 'nutrition-dept@delhi.gov.in'}
                    className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 md:px-5 md:py-3"
                  />
                </div>

                {/* Subject Line (Auto-filled) */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {language === 'en' ? 'Subject' : 'विषय'}
                  </label>
                  <input
                    type="text"
                    value={language === 'en' ? `Weekly Nutrition Report – ${selectedZone}` : `साप्ताहिक पोषण रिपोर्ट – ${selectedZone}`}
                    disabled
                    className="w-full rounded-lg border-2 border-slate-300 bg-slate-100 px-4 py-3 text-slate-700 md:px-5 md:py-3"
                  />
                </div>

                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendReport}
                  disabled={!uploadedFile || !emailInput}
                  className="w-full rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 font-bold text-white shadow-lg transition-all hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed md:px-8 md:py-4 md:text-lg"
                >
                  {language === 'en' ? '✉️ Send Email' : '✉️ ईमेल भेजें'}
                </motion.button>
              </div>
            </div>

            {/* Status Display */}
            {reportStatus === 'sent' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 flex items-center gap-3 rounded-lg bg-green-100 p-4 md:p-6"
              >
                <span className="text-3xl">✅</span>
                <div>
                  <p className="font-bold text-green-900 md:text-lg">
                    {language === 'en' ? 'Report Successfully Sent' : 'रिपोर्ट सफलतापूर्वक भेजी गई'}
                  </p>
                  <p className="text-sm text-green-800">{language === 'en' ? 'Your report has been submitted to the department.' : 'आपकी रिपोर्ट विभाग को सबमिट की जा चुकी है।'}</p>
                </div>
              </motion.div>
            )}

            {!reportStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex items-center gap-3 rounded-lg bg-yellow-100 p-4 md:p-6"
              >
                <span className="text-3xl">⏳</span>
                <div>
                  <p className="font-bold text-yellow-900 md:text-lg">
                    {language === 'en' ? 'Pending Submission' : 'सबमिशन के लिए प्रतीक्षा'}
                  </p>
                  <p className="text-sm text-yellow-800">{language === 'en' ? 'Complete the form above and submit your report.' : 'ऊपर दिया गया फॉर्म पूरा करें और अपनी रिपोर्ट सबमिट करें।'}</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Program Impact Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-16"
        >
          <div className="mb-8 border-b-2 border-slate-300 pb-6">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {language === 'en' ? 'Program Impact Overview' : 'कार्यक्रम प्रभाव सारांश'}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="rounded-lg border-2 border-slate-200 bg-white p-6 shadow-md transition-all hover:border-blue-400 hover:shadow-lg"
              >
                <div className="text-4xl font-bold text-blue-900 md:text-5xl">
                  {metric.icon}
                </div>
                <p className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-700 md:text-base">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <div className="mb-8 border-b-2 border-slate-300 pb-6">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {language === 'en' ? 'Quick Actions' : 'त्वरित कार्य'}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: '➕',
                label: language === 'en' ? t('dashboard.quickActions.addChild') : 'बच्चा पंजीकरण जोड़ें',
                desc: language === 'en' ? t('dashboard.quickActions.addChildDesc') : 'प्रणाली में नए बच्चों को पंजीकृत करें',
                color: THEME.colors.accent[500],
                bg: '#f0fdf4',
              },
              {
                icon: '📊',
                label: language === 'en' ? t('dashboard.quickActions.reports') : 'पोषण रिपोर्ट देखें',
                desc: language === 'en' ? t('dashboard.quickActions.reportsDesc') : 'विस्तृत पोषण विश्लेषण तक पहुंचें',
                color: THEME.colors.primary[500],
                bg: '#f0f9ff',
              },
              {
                icon: '🍽️',
                label: language === 'en' ? t('dashboard.quickActions.logMeal') : 'भोजन खपत दर्ज करें',
                desc: language === 'en' ? t('dashboard.quickActions.logMealDesc') : 'दैनिक भोजन स्वीकृति डेटा रिकॉर्ड करें',
                color: THEME.colors.secondary[500],
                bg: '#f0fdfa',
              },
            ].map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-start rounded-lg border-2 border-slate-200 p-6 text-left transition-all hover:border-blue-400 hover:shadow-lg md:p-8"
                style={{ backgroundColor: action.bg }}
              >
                <span className="text-4xl md:text-5xl">{action.icon}</span>
                <p className="mt-4 text-lg font-bold text-slate-900 md:text-xl">
                  {action.label}
                </p>
                <p className="mt-2 text-sm text-slate-700 md:text-base">
                  {action.desc}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;
