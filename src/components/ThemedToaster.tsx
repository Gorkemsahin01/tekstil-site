import { Toaster } from 'sonner';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-right"
      theme={theme === 'dark' ? 'dark' : 'light'}
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: 'font-sans shadow-lg',
          title: 'font-semibold',
          description: 'text-sm opacity-90',
        },
      }}
    />
  );
}
