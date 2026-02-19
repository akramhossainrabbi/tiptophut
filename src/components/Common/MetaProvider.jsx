import { useEffect } from 'react';
import { useAppSettings } from '../context/SettingsContext';

/**
 * MetaProvider Component - Updates favicon from general settings
 * Should be placed near the root of your app
 */
export const MetaProvider = ({ children }) => {
  const { generalSettings, loading } = useAppSettings();

  useEffect(() => {
    if (!loading && generalSettings?.favicon) {
      // Update favicon in the DOM
      const faviconElement = document.querySelector("link[rel*='icon']");
      if (faviconElement) {
        faviconElement.href = generalSettings.favicon;
      } else {
        // Create favicon element if it doesn't exist
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'shortcut icon';
        newFavicon.href = generalSettings.favicon;
        document.head.appendChild(newFavicon);
      }
    }
  }, [generalSettings, loading]);

  return children;
};

export default MetaProvider;
