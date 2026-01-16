import React from 'react';
import { useT } from '../../i18n/useT';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useT();

  return (
    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
      {(['en', 'uk', 'ru'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
            lang === l
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};