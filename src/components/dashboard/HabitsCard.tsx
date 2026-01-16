import { useEffect, useState } from "react";
import { supabase, Habit } from "../../lib/supabase";
import { getTodayISO } from "../../lib/dates";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useT } from "../../i18n/useT";
import { Trash2, Plus, Check } from "lucide-react";
import { StatsRow } from "./StatsRow";

export const HabitsCard = () => {
  const { t } = useT();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<Record<string, boolean>>({});
  const [newHabit, setNewHabit] = useState("");
  const [loading, setLoading] = useState(true);
  const today = getTodayISO();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today]);

  const fetchData = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch habits
    const { data: habitsData } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (habitsData) setHabits(habitsData);

    // Fetch today's logs
    const { data: logsData } = await supabase
      .from("habit_logs")
      .select("habit_id, done")
      .eq("user_id", user.id)
      .eq("date", today);

    const logMap: Record<string, boolean> = {};
    if (logsData) {
      logsData.forEach((log) => {
        logMap[log.habit_id] = log.done;
      });
    }
    setLogs(logMap);
    setLoading(false);
  };

  const addHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("habits")
      .insert({ user_id: user.id, title: newHabit })
      .select()
      .single();

    if (!error && data) {
      setHabits([...habits, data]);
      setNewHabit("");
    }
  };

  const deleteHabit = async (id: string) => {
    if (!confirm(t("common.delete") + "?")) return;

    await supabase.from("habits").delete().eq("id", id);
    setHabits(habits.filter((h) => h.id !== id));
    const newLogs = { ...logs };
    delete newLogs[id];
    setLogs(newLogs);
  };

  const toggleHabit = async (habitId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const newDone = !logs[habitId];

    // Optimistic
    setLogs({ ...logs, [habitId]: newDone });

    await supabase
      .from("habit_logs")
      .upsert(
        { user_id: user.id, habit_id: habitId, date: today, done: newDone },
        { onConflict: "user_id,habit_id,date" }
      );
  };

  const completedCount = Object.values(logs).filter(Boolean).length;

  if (loading) return <div className="animate-pulse h-64 bg-slate-200 rounded-xl" />;

  return (
    <>
      <StatsRow completed={completedCount} total={habits.length} />

      <Card title={t("dashboard.habits_card_title")}>
        <div className="space-y-1">
          {habits.length === 0 && (
            <p className="text-center text-slate-400 py-8">{t("dashboard.no_habits")}</p>
          )}

          {habits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between group p-3 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                    logs[habit.id]
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-slate-300 text-transparent hover:border-slate-400"
                  }`}
                >
                  <Check className="h-4 w-4" />
                </button>
                <span
                  className={`text-slate-700 font-medium ${
                    logs[habit.id] ? "line-through text-slate-400" : ""
                  }`}
                >
                  {habit.title}
                </span>
              </div>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <form onSubmit={addHabit} className="flex gap-2">
            <Input
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder={t("dashboard.add_habit_placeholder")}
              className="flex-1"
            />
            <Button type="submit" variant="secondary" disabled={!newHabit.trim()}>
              <Plus className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </Card>
    </>
  );
};
