import { useContext } from 'react';
import { I18nContext } from './I18nProvider';

export const useT = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useT must be used within an I18nProvider');
  }
  return context;
};