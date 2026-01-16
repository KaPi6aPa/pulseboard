import { useT } from "../i18n/useT";
import { DailyFocusCard } from "../components/dashboard/DailyFocusCard";
import { HabitsCard } from "../components/dashboard/HabitsCard";
import { formatDateDisplay, getTodayISO } from "../lib/dates";

export default function Dashboard() {
  const { t, lang } = useT();
  const todayDisplay = formatDateDisplay(getTodayISO(), lang);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {t("dashboard.greeting")}
          </h1>
          <p className="text-slate-500 mt-1 capitalize">{todayDisplay}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <DailyFocusCard />
        </div>
        <div className="lg:col-span-2">
          <HabitsCard />
        </div>
      </div>
    </div>
  );
}
