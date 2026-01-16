import { Link } from "react-router-dom";
import { useT } from "../i18n/useT";
import { LanguageSwitcher } from "../components/layout/LanguageSwitcher";
import { Button } from "../components/ui/Button";
import { Activity, Target, CheckSquare, BarChart3 } from "lucide-react";

export default function Landing() {
  const { t } = useT();

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-slate-900" />
            <span className="font-bold text-xl tracking-tight">PulseBoard</span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link to="/login">
              <Button variant="ghost">{t("auth.submit_btn")}</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <div className="container mx-auto px-6 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            {t("landing.hero_title")}
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("landing.hero_subtitle")}
          </p>
          <div className="flex justify-center">
            <Link to="/login">
              <Button className="h-12 px-8 text-lg">{t("landing.cta_login")}</Button>
            </Link>
          </div>
        </div>

        <div className="bg-slate-50 py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("landing.feature_1")}</h3>
                <p className="text-slate-500">{t("landing.feature_1_desc")}</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                  <CheckSquare className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("landing.feature_2")}</h3>
                <p className="text-slate-500">{t("landing.feature_2_desc")}</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                  <BarChart3 className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("landing.feature_3")}</h3>
                <p className="text-slate-500">{t("landing.feature_3_desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
  {t("landing.footer_rights", { year: new Date().getFullYear() })}
</footer>
    </div>
  );
}
