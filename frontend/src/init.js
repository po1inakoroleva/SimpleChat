import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';

import ru from './locales/ru.js';
import ServerProvider from './providers/ServerProvider';
import AuthProvider from './providers/AuthProvider';
import App from './Components/App';
import store from './slices/index.js';

const runApp = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      resources: {
        ru,
      },
    });

  const socket = io('/', { autoConnect: false });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <AuthProvider>
          <ServerProvider socket={socket}>
            <App />
          </ServerProvider>
        </AuthProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default runApp;
