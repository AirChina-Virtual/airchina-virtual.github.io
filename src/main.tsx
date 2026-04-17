import { StrictMode } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Header from './header.tsx';
import "./i18n.ts";
import MarkdownPage from './MarkdownPage.tsx';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/privacy" element={<MarkdownPage md_file="privacy.md" title_identifier='privacy.title' />} />
        </Routes>
      </Router>
    </HelmetProvider>
  </StrictMode>,
)
