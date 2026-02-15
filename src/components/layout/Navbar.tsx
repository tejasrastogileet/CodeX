import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { THEME } from '@/constants/theme';

export const Navbar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { key: 'nav.dashboard', href: '/dashboard' },
    { key: 'nav.children', href: '/children' },
    { key: 'nav.meals', href: '/meals' },
    { key: 'nav.nutrition', href: '/nutrition' },
    { key: 'nav.acceptance', href: '/acceptance' },
    { key: 'nav.reports', href: '/reports' },
  ];
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: THEME.gradients.card,
        boxShadow: THEME.shadows.md,
        borderBottom: '1px solid rgba(11, 60, 93, 0.1)',
      }}
    >
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${THEME.colors.primary[500]}, ${THEME.colors.accent[400]})`,
              }}
            >
              🥗
            </div>
            <span
              className="hidden font-bold sm:inline"
              style={{ color: THEME.colors.primary[500] }}
            >
              AaharMitra
            </span>
          </motion.div>
          
          {/* Desktop Nav Items */}
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <motion.a
                key={item.key}
                href={item.href}
                whileHover={{ y: -2 }}
                className="relative px-2 py-2 text-lg font-semibold transition-all duration-300"
                style={{
                  color: window.location.pathname === item.href ? THEME.colors.primary[700] : THEME.colors.gray[700],
                  borderBottom: window.location.pathname === item.href ? `2px solid ${THEME.colors.primary[600]}` : 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = THEME.colors.primary[600];
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    window.location.pathname === item.href ? THEME.colors.primary[700] : THEME.colors.gray[700];
                }}
              >
                {t(item.key)}
              </motion.a>
            ))}
          </div>
          
          {/* Language Toggle + Mobile Menu */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="rounded-full px-3 py-1.5 font-semibold transition-all"
              style={{
                background: `${THEME.colors.secondary[300]}20`,
                color: THEME.colors.secondary[500],
                border: `1px solid ${THEME.colors.secondary[300]}`,
              }}
            >
              {language === 'en' ? 'ENG' : 'हिं'}
            </motion.button>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden rounded-lg p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: THEME.colors.gray[700] }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        
        {/* Mobile Nav Items */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2 border-t pt-4"
            style={{ borderColor: `${THEME.colors.gray[200]}` }}
          >
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="block rounded-lg px-3 py-2 font-medium transition-all"
                style={{ color: THEME.colors.gray[600] }}
              >
                {t(item.key)}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Navbar;
