import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SiteContentProvider } from './contexts/SiteContentContext';
import { BlogPostsProvider } from './contexts/BlogPostsContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemedToaster from './components/ThemedToaster';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteContentProvider>
      <BlogPostsProvider>
        <LocaleProvider>
          <ThemeProvider>
            <App />
            <ThemedToaster />
          </ThemeProvider>
        </LocaleProvider>
      </BlogPostsProvider>
    </SiteContentProvider>
  </StrictMode>,
);
