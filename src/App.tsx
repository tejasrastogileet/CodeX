import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

// Layout & Providers
import { LanguageProvider } from "@/hooks/useLanguage";
import Layout from "@/components/Layout";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Pages
import Dashboard from "@/pages/Dashboard";
import Children from "@/pages/Children";
import MealRecommendations from "@/pages/MealRecommendations";
import Acceptance from "@/pages/Acceptance";
import Reports from "@/pages/Reports";
import FlavorIntelligence from "@/pages/FlavorIntelligence";
import Community from "@/pages/Community";
import Showcase from "@/pages/Showcase";
import NotFound from "@/pages/NotFound";

// New Premium Sections
import {
  HeroSection,
  DashboardSection,
  ChildHealthProfile,
  MealIntelligence,
  FoodAcceptanceTracker,
  NutritionAnalytics,
  FlavorIntelligencePanel,
  ReportsAndExports,
  CommunityLearning,
} from "@/components";

import { THEME } from "@/constants/theme";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <div
            style={{
              minHeight: "100vh",
              background: THEME.gradients.backgroundSoft,
            }}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/showcase" element={<Showcase />} />
              <Route path="/hero" element={<HeroSection />} />
              <Route path="/dashboard" element={<DashboardSection />} />
              <Route path="/children" element={<Children />} />
              <Route path="/child/:id" element={<ChildHealthProfile />} />
              <Route path="/meals" element={<MealRecommendations />} />
              <Route path="/meals-new" element={<MealIntelligence />} />
              <Route path="/acceptance" element={<Acceptance />} />
              <Route path="/acceptance-new" element={<FoodAcceptanceTracker />} />
              <Route path="/nutrition" element={<NutritionAnalytics />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports-new" element={<ReportsAndExports />} />
              <Route path="/flavor" element={<FlavorIntelligence />} />
              <Route path="/flavor-new" element={<FlavorIntelligencePanel />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community-new" element={<CommunityLearning />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
