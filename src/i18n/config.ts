import i18n from 'i18next';
import en from './en/index';
import ru from './ru/index';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en,
  ru,
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  resources,
  debug: false,
});
