import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useT } from "../i18n/useT";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { LanguageSwitcher } from "../components/layout/LanguageSwitcher";

export default function Settings() {
  const { t } = useT();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
      }
    };
    getUser();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t("settings.title")}</h1>

      <Card title={t("settings.account_section")}>
        <div className="space-y-4">
          <Input
            label={t("settings.email_label")}
            value={email}
            disabled
            readOnly
            className="bg-slate-50 text-slate-500"
          />
        </div>
      </Card>

      <Card title={t("settings.preferences")}>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            {t("settings.lang_section")}
          </label>
          <div className="flex justify-start">
            <LanguageSwitcher />
          </div>
        </div>
      </Card>
    </div>
  );
}
