import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useT } from "../i18n/useT";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { LanguageSwitcher } from "../components/layout/LanguageSwitcher";
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

export default function Login() {
  const { t } = useT();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // instead of storing translated string, store state flags
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSent(false);

    const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/app`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Link to="/" className="mb-6 flex items-center space-x-2 text-slate-900">
          <Activity className="h-10 w-10" />
          <span className="font-bold text-2xl tracking-tight">PulseBoard</span>
        </Link>

        <h2 className="text-center text-3xl font-extrabold text-slate-900">{t("auth.title")}</h2>
        <p className="mt-2 text-center text-sm text-slate-600">{t("auth.subtitle")}</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-xl sm:px-10">
          {sent ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  {/* render translation live so it updates when language changes */}
                  <h3 className="text-sm font-medium text-green-800">{t("auth.check_email")}</h3>
                </div>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleLogin}>
              <Input
                label={t("settings.email_label")}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("auth.email_placeholder")}
              />

              {errorMsg && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-3">
                  {errorMsg}
                </div>
              )}

              <Button type="submit" className="w-full flex justify-center" isLoading={loading}>
                {t("auth.submit_btn")}
              </Button>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">
                  <LanguageSwitcher />
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            {t("auth.back")}
          </Link>
        </div>
      </div>
    </div>
  );
}
