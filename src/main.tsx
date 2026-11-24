import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ArchiveProvider } from './context/ArchiveContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ArchiveProvider>
      <App />
    </ArchiveProvider>
  </React.StrictMode>
);
