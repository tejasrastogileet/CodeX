/**
 * AaharMitra - Bilingual Translations (English + Hindi)
 */

export type Language = 'en' | 'hi';

export const TRANSLATIONS = {
  en: {
    // Government Header
    government: {
      banner: 'Government of NCT of Delhi – Child Nutrition Initiative',
      bannerHindi: 'राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार – बाल पोषण पहल',
      dashboardTitle: 'AaharMitra Nutrition Intelligence Dashboard',
      dashboardSubtitle: 'Real-time nutrition monitoring across Delhi Anganwadi Centers.',
      impact: 'Program Impact Overview',
    },
    
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      children: 'Children',
      meals: 'Meal Recommendations',
      nutrition: 'Nutrition Analytics',
      flavor: 'Flavor Intelligence',
      acceptance: 'Food Acceptance',
      reports: 'Reports',
      community: 'Community',
    },
    
    // Hero Section
    hero: {
      mainHeading: 'Smart Nutrition Monitoring for Healthier Futures',
      subheading: 'AI-powered platform for Anganwadi workers and Mid-Day Meal administrators',
      cta1: 'Add Child',
      cta2: 'View Dashboard',
    },
    
    // Dashboard
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome back',
      stats: {
        totalChildren: 'Total Children Tracked',
        highRisk: 'High Risk Children',
        avgAcceptance: 'Avg Acceptance Rate',
        wasteReduction: 'Food Waste Reduction %',
        budgetEfficiency: 'Budget Efficiency Score',
      },
      aiInsight: {
        title: 'AI Nutrition Risk Alert',
        titleHindi: 'एआई पोषण जोखिम चेतावनी',
        message: 'children show early signs of undernutrition and require dietary intervention',
        messageHindi: 'बच्चों में कुपोषण के प्रारंभिक संकेत पाए गए हैं। आहार हस्तक्षेप आवश्यक है।',
        viewDetails: 'View Details',
      },
      quickActions: {
        addChild: 'Add Child Record',
        addChildHindi: 'बच्चा पंजीकरण जोड़ें',
        addChildDesc: 'Register new children in the system',
        reports: 'View Nutrition Reports',
        reportsHindi: 'पोषण रिपोर्ट देखें',
        reportsDesc: 'Access detailed nutrition analytics',
        logMeal: 'Log Meal Consumption',
        logMealHindi: 'भोजन खपत दर्ज करें',
        logMealDesc: 'Record daily meal acceptance data',
      },
      impact: {
        mealAcceptance: 'Average Meal Acceptance',
        wasteReduction: 'Food Waste Reduction',
        costOptimization: 'Cost Optimization',
        malnutritionDetection: 'Early Malnutrition Detection Enabled',
      },
    },
    
    // Child Profile
    child: {
      title: 'Child Health Profile',
      bmi: 'BMI Category',
      growthTrend: 'Growth Trend',
      nutritionHistory: 'Nutrition History',
      acceptanceTrend: 'Acceptance Trend',
      riskIndicator: 'Risk Indicator',
      aiRecommendation: 'AI Recommendation',
      addChild: 'Add Child',
      editChild: 'Edit Child',
      removeChild: 'Remove Child',
      name: 'Child Name',
      age: 'Age (years)',
      height: 'Height (cm)',
      weight: 'Weight (kg)',
      save: 'Save',
      cancel: 'Cancel',
    },
    
    // Meals
    meals: {
      title: 'Smart Meal Recommendations',
      filter: 'Filter',
      bmiCategory: 'BMI Category',
      cuisine: 'Cuisine',
      budget: 'Budget (₹)',
      category: 'Category',
      nutrition: {
        calories: 'Calories',
        protein: 'Protein',
        carbs: 'Carbs',
        fat: 'Fat',
        iron: 'Iron',
        nutritionScore: 'Nutrition Score',
        nutritionPerRupee: 'Nutrition per ₹',
      },
      badges: {
        ironRich: 'Iron-Rich',
        seasonal: 'Seasonal',
        highAcceptance: 'High Acceptance',
      },
      cookingInstructions: 'Cooking Instructions',
    },
    
    // Analytics
    analytics: {
      title: 'Nutrition Analytics',
      dailyNutrition: 'Daily Nutrition',
      weeklyTrend: 'Weekly Trend',
      macronutrients: 'Macronutrients',
      budgetEfficiency: 'Budget Efficiency',
      acceptanceRate: 'Acceptance Rate',
      viewDetails: 'View Details',
    },
    
    // Flavor Intelligence
    flavor: {
      title: 'Flavor Intelligence',
      compatibility: 'Compatibility',
      score: 'Score',
      suggestion: 'Enhancement Suggestion',
      confidenceLevel: 'Confidence Level',
      pairing: {
        good: 'Good Pairing',
        moderate: 'Moderate Pairing',
        poor: 'Poor Pairing',
      },
    },
    
    // Acceptance Tracker
    acceptance: {
      title: 'Food Acceptance Tracker',
      logMeal: 'Log Meal',
      fullyEaten: 'Fully Eaten',
      partiallyEaten: 'Partially Eaten',
      mostlyWasted: 'Mostly Wasted',
      trend: 'Acceptance Trend',
      badge: 'High Acceptance Meal',
      confidence: 'Confidence Score',
      selectChild: 'Select Child',
      selectMeal: 'Select Meal',
      selectDate: 'Select Date',
    },
    
    // Reports
    reports: {
      title: 'Reports & Insights',
      weekly: 'Weekly Summary',
      bmiTrends: 'BMI Trends',
      wasteReduction: 'Food Waste Reduction',
      topMeals: 'Top Performing Meals',
      exportCSV: 'Export to CSV',
      downloadReport: 'Download Report',
    },
    
    // Community
    community: {
      title: 'Community Learning',
      bestMeals: 'Best Meals This Week',
      ranking: 'Ranking',
      acceptance: 'Acceptance Rate',
    },
    
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      view: 'View',
      hide: 'Hide',
      more: 'More',
      less: 'Less',
      noData: 'No data available',
      language: 'English',
    },
  },
  
  hi: {
    // Government Header
    government: {
      banner: 'Government of NCT of Delhi – Child Nutrition Initiative',
      bannerHindi: 'राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार – बाल पोषण पहल',
      dashboardTitle: 'आहारमित्र पोषण विश्लेषण डैशबोर्ड',
      dashboardSubtitle: 'दिल्ली आंगनवाड़ी केंद्रों के लिए वास्तविक समय पोषण निगरानी प्रणाली।',
      impact: 'कार्यक्रम प्रभाव सारांश',
    },
    
    // Navigation
    nav: {
      dashboard: 'डैशबोर्ड',
      children: 'बच्चे',
      meals: 'भोजन सिफारिशें',
      nutrition: 'पोषण विश्लेषण',
      flavor: 'स्वाद बुद्धिमत्ता',
      acceptance: 'भोजन स्वीकृति',
      reports: 'रिपोर्ट',
      community: 'समुदाय',
    },
    
    // Hero Section
    hero: {
      mainHeading: 'स्वस्थ भविष्य के लिए स्मार्ट पोषण निगरानी',
      subheading: 'आंगनवाड़ी कार्यकर्ताओं और मिड-डे मील प्रशासकों के लिए एआई-संचालित मंच',
      cta1: 'बच्चा जोड़ें',
      cta2: 'डैशबोर्ड देखें',
    },
    
    // Dashboard
    dashboard: {
      title: 'डैशबोर्ड',
      welcome: 'स्वागत है आपका',
      stats: {
        totalChildren: 'कुल बच्चे ट्रैक किए गए',
        highRisk: 'उच्च जोखिम वाले बच्चे',
        avgAcceptance: 'औसत स्वीकृति दर',
        wasteReduction: 'खाद्य अपशिष्ट में कमी %',
        budgetEfficiency: 'बजट दक्षता स्कोर',
      },
      aiInsight: {
        title: 'एआई पोषण जोखिम चेतावनी',
        titleHindi: 'एआई पोषण जोखिम चेतावनी',
        message: 'बच्चों में कुपोषण के प्रारंभिक संकेत पाए गए हैं',
        messageHindi: 'बच्चों में कुपोषण के प्रारंभिक संकेत पाए गए हैं। आहार हस्तक्षेप आवश्यक है।',
        viewDetails: 'विवरण देखें',
      },
      quickActions: {
        addChild: 'बच्चा पंजीकरण जोड़ें',
        addChildHindi: 'बच्चा पंजीकरण जोड़ें',
        addChildDesc: 'प्रणाली में नए बच्चों को पंजीकृत करें',
        reports: 'पोषण रिपोर्ट देखें',
        reportsHindi: 'पोषण रिपोर्ट देखें',
        reportsDesc: 'विस्तृत पोषण विश्लेषण तक पहुंचें',
        logMeal: 'भोजन खपत दर्ज करें',
        logMealHindi: 'भोजन खपत दर्ज करें',
        logMealDesc: 'दैनिक भोजन स्वीकृति डेटा रिकॉर्ड करें',
      },
      impact: {
        mealAcceptance: 'औसत भोजन स्वीकृति',
        wasteReduction: 'खाद्य अपशिष्ट में कमी',
        costOptimization: 'लागत अनुकूलन',
        malnutritionDetection: 'प्रारंभिक कुपोषण पहचान सक्षम',
      },
    },
    
    // Child Profile
    child: {
      title: 'बच्चे की स्वास्थ्य प्रोफ़ाइल',
      bmi: 'बीएमआई श्रेणी',
      growthTrend: 'वृद्धि प्रवृत्ति',
      nutritionHistory: 'पोषण इतिहास',
      acceptanceTrend: 'स्वीकृति प्रवृत्ति',
      riskIndicator: 'जोखिम संकेतक',
      aiRecommendation: 'एआई सिफारिश',
      addChild: 'बच्चा जोड़ें',
      editChild: 'बच्चे को संपादित करें',
      removeChild: 'बच्चे को हटाएं',
      name: 'बच्चे का नाम',
      age: 'आयु (वर्ष)',
      height: 'ऊंचाई (सेमी)',
      weight: 'वजन (किग्रा)',
      save: 'सहेजें',
      cancel: 'रद्द करें',
    },
    
    // Meals
    meals: {
      title: 'स्मार्ट भोजन सिफारिशें',
      filter: 'फ़िल्टर',
      bmiCategory: 'बीएमआई श्रेणी',
      cuisine: 'पकवान की शैली',
      budget: 'बजट (₹)',
      category: 'श्रेणी',
      nutrition: {
        calories: 'कैलोरी',
        protein: 'प्रोटीन',
        carbs: 'कार्बोहाइड्रेट',
        fat: 'वसा',
        iron: 'लोहा',
        nutritionScore: 'पोषण स्कोर',
        nutritionPerRupee: 'प्रति ₹ पोषण',
      },
      badges: {
        ironRich: 'लोहा समृद्ध',
        seasonal: 'मौसमी',
        highAcceptance: 'उच्च स्वीकृति',
      },
      cookingInstructions: 'पकाने के निर्देश',
    },
    
    // Analytics
    analytics: {
      title: 'पोषण विश्लेषण',
      dailyNutrition: 'दैनिक पोषण',
      weeklyTrend: 'साप्ताहिक प्रवृत्ति',
      macronutrients: 'मैक्रोन्यूट्रिएंट्स',
      budgetEfficiency: 'बजट दक्षता',
      acceptanceRate: 'स्वीकृति दर',
      viewDetails: 'विवरण देखें',
    },
    
    // Flavor Intelligence
    flavor: {
      title: 'स्वाद बुद्धिमत्ता',
      compatibility: 'संगतता',
      score: 'स्कोर',
      suggestion: 'वृद्धि सुझाव',
      confidenceLevel: 'विश्वास स्तर',
      pairing: {
        good: 'अच्छा संयोजन',
        moderate: 'माध्यम संयोजन',
        poor: 'खराब संयोजन',
      },
    },
    
    // Acceptance Tracker
    acceptance: {
      title: 'भोजन स्वीकृति ट्रैकर',
      logMeal: 'भोजन लॉग करें',
      fullyEaten: 'पूरी तरह खाया गया',
      partiallyEaten: 'आंशिक रूप से खाया गया',
      mostlyWasted: 'ज्यादातर बर्बाद',
      trend: 'स्वीकृति प्रवृत्ति',
      badge: 'उच्च स्वीकृति भोजन',
      confidence: 'आत्मविश्वास स्कोर',
      selectChild: 'बच्चा चुनें',
      selectMeal: 'भोजन चुनें',
      selectDate: 'तारीख चुनें',
    },
    
    // Reports
    reports: {
      title: 'रिपोर्ट और अंतर्दृष्टि',
      weekly: 'साप्ताहिक सारांश',
      bmiTrends: 'बीएमआई प्रवृत्तियाँ',
      wasteReduction: 'खाद्य अपशिष्ट में कमी',
      topMeals: 'शीर्ष प्रदर्शन भोजन',
      exportCSV: 'सीएसवी को निर्यात करें',
      downloadReport: 'रिपोर्ट डाउनलोड करें',
    },
    
    // Community
    community: {
      title: 'समुदाय शिक्षा',
      bestMeals: 'इस सप्ताह के सर्वोत्तम भोजन',
      ranking: 'रैंकिंग',
      acceptance: 'स्वीकृति दर',
    },
    
    // Common
    common: {
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      warning: 'चेतावनी',
      info: 'जानकारी',
      close: 'बंद करें',
      back: 'पीछे',
      next: 'आगे',
      previous: 'पिछला',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      confirm: 'पुष्टि करें',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      sort: 'सॉर्ट',
      view: 'देखें',
      hide: 'छुपाएं',
      more: 'अधिक',
      less: 'कम',
      noData: 'कोई डेटा उपलब्ध नहीं',
      language: 'हिंदी',
    },
  },
};

export const getTranslation = (lang: Language, path: string): string => {
  const keys = path.split('.');
  let value: any = TRANSLATIONS[lang];
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  return value || path;
};
