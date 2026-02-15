/**
 * Reusable UI Component Patterns
 * Common layouts and components for consistent styling
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

// Page Header Component
interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, icon: Icon, action }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-6 w-6 text-primary" />}
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

// Metric Card Component
interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  color?: 'primary' | 'accent' | 'secondary' | 'destructive';
  trend?: { value: number; isPositive: boolean };
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon: Icon,
  color = 'primary',
  trend,
}) => {
  const colorMap = {
    primary: 'text-primary',
    accent: 'text-accent',
    secondary: 'text-secondary',
    destructive: 'text-destructive',
  };

  return (
    <Card className="shadow-sm border-border/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {trend && (
                <span className={`text-xs font-semibold ${trend.isPositive ? 'text-primary' : 'text-destructive'}`}>
                  {trend.isPositive ? '↑' : '↓'}{Math.abs(trend.value)}%
                </span>
              )}
            </div>
          </div>
          {Icon && <Icon className={`h-8 w-8 ${colorMap[color]}/30`} />}
        </div>
      </CardContent>
    </Card>
  );
};

// Status Badge Component
interface StatusBadgeProps {
  status: string;
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const statusMap: Record<string, { bg: string; text: string }> = {
    success: { bg: 'bg-primary/10', text: 'text-primary' },
    warning: { bg: 'bg-accent/10', text: 'text-accent' },
    error: { bg: 'bg-destructive/10', text: 'text-destructive' },
    info: { bg: 'bg-info/10', text: 'text-info' },
  };

  const style = statusMap[status] || statusMap.info;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
      {label}
    </span>
  );
};

// Empty State Component
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div className="mb-4 p-4 rounded-full bg-muted">
      <Icon className="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground max-w-xs mb-6">{description}</p>
    {action && <div>{action}</div>}
  </div>
);

// Alert Component
interface AlertProps {
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
  icon?: LucideIcon;
}

export const Alert: React.FC<AlertProps> = ({ type, title, message, icon: Icon }) => {
  const typeMap = {
    success: { bg: 'bg-primary/5', border: 'border-primary/30', icon: 'text-primary' },
    warning: { bg: 'bg-accent/5', border: 'border-accent/30', icon: 'text-accent' },
    error: { bg: 'bg-destructive/5', border: 'border-destructive/30', icon: 'text-destructive' },
    info: { bg: 'bg-info/5', border: 'border-info/30', icon: 'text-info' },
  };

  const style = typeMap[type];

  return (
    <div className={`${style.bg} border border-l-4 ${style.border} rounded-md p-4 flex gap-3`}>
      {Icon && <Icon className={`h-5 w-5 ${style.icon} flex-shrink-0 mt-0.5`} />}
      <div>
        <h4 className="font-semibold text-foreground text-sm">{title}</h4>
        {message && <p className="text-xs text-muted-foreground mt-1">{message}</p>}
      </div>
    </div>
  );
};

// Section Component
interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, subtitle, children }) => (
  <div className="space-y-3">
    <div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

// Info Card Component
interface InfoCardProps {
  label: string;
  value: string | React.ReactNode;
  icon?: LucideIcon;
}

export const InfoCard: React.FC<InfoCardProps> = ({ label, value, icon: Icon }) => (
  <Card className="shadow-sm border-border/50">
    <CardContent className="p-4 flex items-center justify-between">
      <div className="flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground mt-1">{value}</p>
      </div>
      {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
    </CardContent>
  </Card>
);
