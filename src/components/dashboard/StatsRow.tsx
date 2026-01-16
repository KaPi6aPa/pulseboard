import React from 'react';
import { useT } from '../../i18n/useT';

interface StatsRowProps {
  completed: number;
  total: number;
}

export const StatsRow: React.FC<StatsRowProps> = ({ completed, total }) => {
  const { t } = useT();
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center">
        <span className="text-3xl font-bold text-slate-900">{percentage}%</span>
        <span className="text-xs text-slate-500 uppercase tracking-wider mt-1">{t('dashboard.stats_title')}</span>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center">
        <span className="text-3xl font-bold text-slate-900">{completed}<span className="text-slate-400 text-xl font-normal">/{total}</span></span>
        <span className="text-xs text-slate-500 uppercase tracking-wider mt-1">{t('dashboard.stat_completed')}</span>
      </div>
    </div>
  );
};