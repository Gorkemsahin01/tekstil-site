import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Her route değişiminde sayfayı en üste kaydırır (footer’dan link ile gidince altta kalmayı önler). */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
