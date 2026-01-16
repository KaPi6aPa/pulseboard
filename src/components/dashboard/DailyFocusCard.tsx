import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { getTodayISO } from '../../lib/dates';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { useT } from '../../i18n/useT';
import { CheckCircle2, Circle } from 'lucide-react';

export const DailyFocusCard: React.FC = () => {
  const { t } = useT();
  const [focus, setFocus] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const today = getTodayISO();

  useEffect(() => {
    const fetchFocus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('daily_focus')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (!error && data) {
        setFocus(data.focus_text);
        setIsDone(data.done);
      }
      setLoading(false);
    };

    fetchFocus();
  }, [today]);

  const saveFocus = async (newFocus: string, newDone: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Optimistic update
    setFocus(newFocus);
    setIsDone(newDone);

    await supabase
      .from('daily_focus')
      .upsert(
        { user_id: user.id, date: today, focus_text: newFocus, done: newDone },
        { onConflict: 'user_id,date' }
      );
  };

  const toggleDone = () => {
    if (!focus.trim()) return;
    saveFocus(focus, !isDone);
  };

  const handleBlur = () => {
    if (focus.trim()) {
      saveFocus(focus, isDone);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  if (loading) return <div className="animate-pulse h-32 bg-slate-200 rounded-xl" />;

  return (
    <Card title={t('dashboard.focus_card_title')} className="mb-6">
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleDone}
          disabled={!focus.trim()}
          className={`flex-shrink-0 transition-colors ${isDone ? 'text-green-500' : 'text-slate-300 hover:text-slate-400'}`}
        >
          {isDone ? <CheckCircle2 className="h-8 w-8" /> : <Circle className="h-8 w-8" />}
        </button>
        <div className="flex-1">
          <Input
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={t('dashboard.focus_placeholder')}
            className={`text-lg border-none px-0 focus:ring-0 placeholder:text-slate-300 ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}
          />
        </div>
      </div>
    </Card>
  );
};