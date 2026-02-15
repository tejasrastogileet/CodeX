import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UtensilsCrossed, ThumbsUp, AlertTriangle, TrendingUp, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getChildren, getAcceptanceLogs } from '@/lib/storage';
import { Child, AcceptanceLog } from '@/types';

export default function Dashboard() {
  const [children, setChildren] = useState<Child[]>([]);
  const [logs, setLogs] = useState<AcceptanceLog[]>([]);

  useEffect(() => {
    setChildren(getChildren());
    setLogs(getAcceptanceLogs());
  }, []);

  const severeCount = children.filter(c => c.bmiCategory === 'severely_underweight').length;
  const acceptanceRate = logs.length
    ? Math.round((logs.filter(l => l.status === 'fully_eaten').length / logs.length) * 100)
    : 0;
  const wasteRate = logs.length
    ? Math.round((logs.filter(l => l.status === 'mostly_wasted').length / logs.length) * 100)
    : 0;

  const quickActions = [
    { to: '/children', icon: Users, label: 'Children', desc: 'Manage profiles', color: 'from-primary to-primary/70' },
    { to: '/meals', icon: UtensilsCrossed, label: 'Meals', desc: 'View recommendations', color: 'from-accent to-accent/70' },
    { to: '/acceptance', icon: ThumbsUp, label: 'Log Meal', desc: 'Track consumption', color: 'from-secondary to-secondary/70' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your nutrition program</p>
      </div>

      {/* Critical Alerts */}
      {severeCount > 0 && (
        <Card className="border-destructive/30 bg-destructive/5 border-l-4 border-l-destructive shadow-md">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-destructive text-sm">{severeCount} child(ren) severely underweight</p>
              <p className="text-xs text-destructive/80 mt-0.5">Immediate nutritional intervention recommended</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Children Tracked</p>
                <p className="text-2xl font-bold text-foreground">{children.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Meal Logs</p>
                <p className="text-2xl font-bold text-foreground">{logs.length}</p>
              </div>
              <UtensilsCrossed className="h-8 w-8 text-accent/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Acceptance Rate</p>
                <p className="text-2xl font-bold text-primary">{acceptanceRate}%</p>
              </div>
              <ThumbsUp className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Waste Rate</p>
                <p className="text-2xl font-bold text-destructive/80">{wasteRate}%</p>
              </div>
              <Leaf className="h-8 w-8 text-destructive/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map(action => (
            <Link key={action.to} to={action.to}>
              <Card className="hover:shadow-md hover:border-primary/20 transition-all duration-200 shadow-sm border-border/50 cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center text-center gap-2.5">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-md`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{action.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{action.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Program Impact */}
      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Program Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { label: 'Food Waste Reduction', value: '15-20%', color: 'text-accent' },
            { label: 'Meal Acceptance', value: '30%+', color: 'text-primary' },
            { label: 'Cost Savings', value: '10-15%', color: 'text-secondary' },
            { label: 'Early Detection', value: '98%', color: 'text-primary' },
          ].map(m => (
            <div key={m.label} className="flex items-center justify-between py-2 border-t border-border/50 first:border-0 first:py-0">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <span className={`text-xs font-semibold ${m.color}`}>{m.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
