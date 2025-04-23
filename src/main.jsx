import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { LoadingProvider } from './contexts/LoadingContext';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </PersistGate>
    </Provider>
);
