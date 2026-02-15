import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, UtensilsCrossed, ThumbsUp, BarChart3, Beaker, BookOpen } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/children', icon: Users, label: 'Children' },
  { to: '/meals', icon: UtensilsCrossed, label: 'Meals' },
  { to: '/acceptance', icon: ThumbsUp, label: 'Acceptance' },
  { to: '/reports', icon: BarChart3, label: 'Reports' },
  { to: '/flavor', icon: Beaker, label: 'Flavor' },
  { to: '/community', icon: BookOpen, label: 'Community' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 shadow-sm">
        <div className="flex items-center justify-center px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <span className="text-xl">🍽️</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">AaharMitra</h1>
              <p className="text-xs text-muted-foreground font-medium">Nutrition Intelligence</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 px-4 py-5 max-w-2xl mx-auto w-full">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 shadow-2xl">
        <div className="flex justify-around items-center max-w-2xl mx-auto h-20">
          {navItems.map(item => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center justify-center py-2.5 px-2 min-w-0 flex-1 transition-colors duration-200 ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title={item.label}
              >
                <item.icon className={`h-5 w-5 transition-all duration-200 ${isActive ? 'stroke-[2.5] scale-110' : 'stroke-2'}`} />
                <span className="text-[11px] mt-1 font-medium truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
