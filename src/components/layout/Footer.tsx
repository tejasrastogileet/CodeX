import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { THEME } from '@/constants/theme';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-t"
      style={{
        borderColor: THEME.colors.gray[200],
        background: THEME.gradients.backgroundSoft,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-bold" style={{ color: THEME.colors.primary[500] }}>
              AaharMitra
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Smart Nutrition Monitoring Platform
            </p>
          </div>
          
          {/* Product Links */}
          <div>
            <h4 className="font-semibold" style={{ color: THEME.colors.gray[900] }}>
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">Dashboard</a></li>
              <li><a href="#" className="hover:underline">Child Registry</a></li>
              <li><a href="#" className="hover:underline">Meal Recommendations</a></li>
              <li><a href="#" className="hover:underline">Reports</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-semibold" style={{ color: THEME.colors.gray[900] }}>
              Resources
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">Documentation</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="font-semibold" style={{ color: THEME.colors.gray[900] }}>
              Follow Us
            </h4>
            <div className="mt-4 flex gap-3">
              {['f', 't', 'in', 'gh'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                  style={{
                    background: `linear-gradient(135deg, ${THEME.colors.primary[500]}, ${THEME.colors.secondary[300]})`,
                  }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div
          className="my-8 border-t"
          style={{ borderColor: THEME.colors.gray[200] }}
        />
        
        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-600 sm:flex-row">
          <p>
            © {currentYear} AaharMitra. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact: support@aaharmitra.gov.in</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
