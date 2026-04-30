import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CompanyProvider } from './hooks/useCompany';
import { LangProvider } from './hooks/useLang';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <CompanyProvider>
          <App />
        </CompanyProvider>
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>
);
