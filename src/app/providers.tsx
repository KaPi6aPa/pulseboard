import React from 'react';
import { I18nProvider } from '../i18n/I18nProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nProvider children={children} />
  );
};